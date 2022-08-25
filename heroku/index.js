const { herokuSetup, destroyHerokuApp } = require(`./heroku`);
const getApiKey = require(`./apiKey`);
const { useTool } = require(`./docker`);

module.exports = {
	getApiKey,
	herokuSetup,
	destroyHerokuApp,
	useTool
};
