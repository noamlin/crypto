const globals = require('./globals.js');
const winston = require('winston');

const generalFormat = winston.format((info, opts) => {
	return info;
});

const transports = {
	console: new winston.transports.Console({ format: winston.format.simple(), timestamp: true }),
	outputFile: new winston.transports.File({ filename: 'output.log' }), // Write to all logs with chosen level and below to `combined.log`
	errorFile: new winston.transports.File({ filename: 'error.log', level: 'error' }) // Write all logs error (and below) to `error.log`
};

const logger = winston.createLogger({
	level: 'debug',
	format: winston.format.json(),
	transports: [ transports.console ]
});

if (globals.env === 'production') {
	logger.configure({
		level: 'info',
		format: winston.format.splat(),
		transports: [ transports.errorFile, transports.outputFile ]
	});
}

module.exports = logger;