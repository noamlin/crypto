const globals = require('./globals.js');
const bunyan = require('bunyan');

let logger;

if (globals.env === 'development') {
	logger = bunyan.createLogger({
		name: 'CryptoAlgo',
		streams: [
			{
				level: 'trace',
				stream: process.stdout
			},
			{
				level: 'error',
				stream: process.stderr
			}
		]
	});
} else {
	logger = bunyan.createLogger({
		name: 'CryptoAlgo',
		streams: [
			{
				level: 'trace',
				stream: process.stdout
			},
			{
				level: 'error',
				stream: process.stderr
			}
		]
	});
}

module.exports = logger;