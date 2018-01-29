var request = require('request');

console.log('fetching data from coinmarketcap.com');
request({ method: 'GET', url: 'https://api.coinmarketcap.com/v1/ticker/?limit=10' }, (error, response, body) => {
	if (error) {
		console.error(error);
		return;
	}
	if (!response) {
		console.error('no response');
		return;
	}
	if (response.statusCode !== 200) {
		console.log('statusCode:', response && response.statusCode);
		return;
	}

	console.log('body:', body);
});