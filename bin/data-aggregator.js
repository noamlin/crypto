const async = require('async');
const coinmarketcap = require('../aggregator/coinmarketcap.js');

module.exports = (context, callback) => {
	context.aggregatedData = {};

	async.parallel([coinmarketcap],
	(err, results) => { //waterfall completion callback
		if(err) {
			callback(err);
		} else {
			context.aggregatedData.coinmarketcap = results[0];
			callback(null, context);
		}
	});
};