const _globals = require('../server/globals.js');
const logger = require('../server/logger.js');
const request = require('request');
const mongo = require('mongodb');

module.exports = (cb) => {
	logger.info('fetching data from coinmarketcap.com');
	request({ method: 'GET', url: 'https://api.coinmarketcap.com/v1/ticker/?limit=10' }, (error, response, body) => {
		if (error) {
			logger.error(error);
			cb(error);
		}
		else if (!response) {
			logger.error('no response');
			cb(new Error('no response'));
		}
		else if (response.statusCode !== 200) {
			logger.info('statusCode:', response && response.statusCode);
			cb(new Error('bad status code'));
		}
		else {
			let resJson;
			try {
				resJson = JSON.parse(body);

				mongo.MongoClient.connect(_globals.configs.mongodb.url, (mongoErr, client) => {
					if (mongoErr) {
						callback(mongoErr);
					} else {
						let collection = client.db('crypto').collection('coinmarketcap');
						let now = new Date();

						for (let i = 0; i < resJson.length; i++) {
							resJson[i].created = now; //add the timestamp of when inserted to the db
						}

						collection.insertMany(resJson, null, (insertErr, insertResults) => {
							if (insertErr) {
								callback(insertErr);
							} else {
								cb(null, resJson);
							}
						});
					}
				});
			} catch(e) {
				cb(new Error('response is not a valid JSON'));
			}
		}
	});
};