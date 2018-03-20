const logger = require('../server/logger.js');

module.exports = (cb) => {
	logger.info('fetching data from coingecko');
	let data = require('../temp/coingecko.json');
	cb(null, data.coins);
};