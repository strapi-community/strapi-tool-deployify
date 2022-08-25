const { herokuSetup, destroyHerokuApp } = require(`./heroku`);
const getApiKey = require(`./apiKey`);

module.exports = {
	getApiKey,
	herokuSetup,
	destroyHerokuApp
};
