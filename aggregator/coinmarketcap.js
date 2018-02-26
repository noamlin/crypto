const logger = require('../server/logger.js');
const request = require('request');

module.exports = (cb) => {
	logger.log('info', 'fetching data from coinmarketcap.com');
	request({ method: 'GET', url: 'https://api.coinmarketcap.com/v1/ticker/?limit=10' }, (error, response, body) => {
		if (error) {
			logger.error(error);
			cb(error);
		}
		else if (!response) {
			logger.error('no response');
			cb(new Error('no response'));
		}
		else if (response.statusCode !== 200) {
			logger.info('statusCode:', response && response.statusCode);
			cb(new Error('bad status code'));
		}
		else {
			let resJson;
			try {
				resJson = JSON.parse(body);
				cb(null, resJson);
			} catch(e) {
				cb(new Error('response is not a valid JSON'));
			}
		}
	});
};