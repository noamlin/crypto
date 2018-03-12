const logger = require('../server/logger.js');
const csv = require('fast-csv');

module.exports = (cb) => {
	logger.info('fetching data from coingecko');
	let data = require('../temp/coingecko.json');
	cb(null, data.coins);
};