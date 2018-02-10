const async = require('async');
const dataAggregator = require('./bin/data-aggregator.js');

let data;

async.series([
	function(cb) {
		dataAggregator.start(function(err, results) {
			if(err) {
				cb(err);
			} else {
				cb(null, results);
			}
		});
	}
],
function(err, results) {
	if(err) {
		console.error(err);
	} else {
		console.log(results);
	}
});