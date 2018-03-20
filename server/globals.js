let env = process.env.NODE_ENV || 'development';
let appName = 'CryptoAlgo';
let configs;

if (env === 'development') {
	configs = require('../app-data/development.json');
} else {
	configs = require('../app-data/production.json'); // TODO - update when really going for testing and production
}

module.exports = {
	env: env,
	appName: appName,
	configs: configs
};