const async = require('async');
const logger = require('../server/logger.js');
const coinmarketcap = require('../aggregator/coinmarketcap.js');
const coingecko = require('../aggregator/coingecko.js');

module.exports = (context, callback) => {
	context.aggregatedData = {};

	async.parallel([coinmarketcap, coingecko],
	(aggregationErr, results) => { //parallel completion callback
		if(aggregationErr) {
			callback(aggregationErr);
		} else {
			context.aggregatedData.coinmarketcap = results[0];
			context.aggregatedData.coingecko = results[1];
			callback(null, context);
		}
	});
};