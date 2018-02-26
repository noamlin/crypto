const logger = require('../server/logger.js');
const csv = require('fast-csv');

let data = [];

module.exports = (cb) => {
	logger.log('info', 'fetching data from coingecko');
	csv.fromPath('./temp/coingecko.csv')
		.on('data', (row) => {
			data.push(row);
		})
		.on('end', () => {
			cb(null, data);
		});
};