const async = require('async');
const coinmarketcap = require('../aggregator/coinmarketcap.js');
const coingecko = require('../aggregator/coingecko.js');

module.exports = (context, callback) => {
	context.aggregatedData = {};

	async.parallel([coinmarketcap, coingecko],
	(err, results) => { //parallel completion callback
		if(err) {
			callback(err);
		} else {
			context.aggregatedData.coinmarketcap = results[0];
			context.aggregatedData.coingecko = results[1];
			callback(null, context);
		}
	});
};