const async = require('async');
const logger = require('./server/logger.js');
const dataAggregator = require('./bin/data-aggregator.js');

let context = {};

async.waterfall([
	(callback) => { callback(null, context); }, //init the 'context' as our pass along result
	dataAggregator
], (err, results) => { //waterfall completion callback
		if(err) {
			logger.error(err);
		} else {
			logger.info('data: %j', results);
		}
});