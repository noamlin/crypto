const _globals = require('./globals.js');
const logger = require('./logger.js');
const express = require('express');

module.exports = (context, callback) => {
	context.app = express();

	context.app.get('/', (req, res) => {
		res.send(JSON.stringify(context.aggregatedData));
	});

	context.app.listen(1337, () => {
		logger.info(_globals.appName + ' is listening on port 1337');
		callback(null, context);
	});
};