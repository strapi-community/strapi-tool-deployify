const { config, spinner, chalk } = require(`../utils`);
const shell = require(`shelljs`);

const createHerokuEnv = async () => {
	console.log(`\n`);
	shell.exec(
		`HEROKU_API_KEY="${config.herokuApiToken}" heroku config:set WEBSITE_URL=$(heroku info -s | grep web_url | cut -d= -f2) APP_KEYS=${config.appKeys} API_TOKEN_SALT=${config.apiTokenSalt} ADMIN_JWT_SECRET=${config.adminJwtSecret} JWT_SECRET=${config.jwtSecret} NODE_ENV=${config.env}  --app ${config.projectName}`,
		{ silent: true }
	);
	spinner.stopAndPersist({
		symbol: `🦄`,
		text: `Setting up your ${chalk.magenta.bold(`Heroku`)} ${
			config.projectName
		} project variables \n`
	});
};
const createHerokuApp = async () => {
	spinner.stopAndPersist({
		symbol: `🌍`,
		text: `Setting up your ${chalk.magenta.bold(
			`Heroku`
		)} app named ${config.projectName.toUpperCase()} \n`
	});
	shell.exec(
		`HEROKU_API_KEY="${config.herokuApiToken}" heroku create ${config.projectName} --region ${config.herokuRegion}`
	);
};

const setupHerokuPostgres = async () => {
	shell.exec(
		`HEROKU_API_KEY="${config.herokuApiToken}" heroku addons:create heroku-postgresql:hobby-dev --app ${config.projectName}`,
		{ silent: true }
	);
	spinner.stopAndPersist({
		symbol: `💾`,
		text: `Setting up your ${chalk.magenta.bold(`Heroku`)} database \n`
	});
};

const destroyHerokuApp = async () => {
	spinner.stopAndPersist({
		symbol: `🌍`,
		text: `Destroying your ${chalk.magenta.bold(`Heroku`)} app \n`
	});
	shell.exec(
		`HEROKU_API_KEY="${config.herokuApiToken}" heroku apps:destroy ${config.projectName} --confirm ${config.projectName}`
	);
	shell.exec(`HEROKU_API_KEY="${config.herokuApiToken}" heroku apps`, {});
};

module.exports = {
	createHerokuApp,
	createHerokuEnv,
	setupHerokuPostgres,
	destroyHerokuApp
};
