const async = require('async');
const _globals = require('./server/globals.js');
const logger = require('./server/logger.js');
const dataAggregator = require('./bin/data-aggregator.js');
const startExpress = require('./server/start-express.js');

let context = {};

async.waterfall([
	(callback) => { callback(null, context); }, //init the 'context' as our pass along result
	dataAggregator,
	startExpress
], (err, results) => { //waterfall completion callback
		if(err) {
			logger.error(err);
		} else {
			logger.info('Application completed booting');

			process.on('SIGINT', () => {
				logger.info('Exiting ' + _globals.appName);
				process.exit();
			})
		}
});