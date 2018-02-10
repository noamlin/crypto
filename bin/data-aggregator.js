const async = require('async');
const request = require('request');

module.exports = {
	start: (callback) => {
		let data = {};
		async.parallel([
			function(cb) {
				console.log('fetching data from coinmarketcap.com');
				request({ method: 'GET', url: 'https://api.coinmarketcap.com/v1/ticker/?limit=10' }, (error, response, body) => {
					if (error) {
						console.error(error);
						cb(error);
					}
					else if (!response) {
						console.error('no response');
						cb(new Error('no response'));
					}
					else if (response.statusCode !== 200) {
						console.log('statusCode:', response && response.statusCode);
						cb(new Error('bad status code'));
					}
					else {
						cb(null, body);
					}
				});
			}
		],
		function(err, results) {
			if(err) {
				callback(err);
			} else {
				callback(null, results);
			}
		});
	}
};