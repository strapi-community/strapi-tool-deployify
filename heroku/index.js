const {
	createHerokuApp,
	createHerokuEnv,
	setupHerokuPostgres,
	destroyHerokuApp
} = require(`./heroku`);
const getApiKey = require(`./apiKey`);

module.exports = {
	getApiKey,
	createHerokuApp,
	createHerokuEnv,
	destroyHerokuApp,
	setupHerokuPostgres
};
