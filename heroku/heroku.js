const { config, spinner, chalk } = require(`../utils`);
const shell = require(`shelljs`);
const _createEnv = async () => {
	console.log(`\n`);
	shell.exec(
		`HEROKU_API_KEY="${config.herokuApiToken}" heroku config:set WEBSITE_URL=$(heroku info -s | grep web_url | cut -d= -f2) APP_KEYS=${config.strapiSecrets.appKeys} API_TOKEN_SALT=${config.strapiSecrets.apiTokenSalt} ADMIN_JWT_SECRET=${config.strapiSecrets.adminJwtSecret} JWT_SECRET=${config.strapiSecrets.jwtSecret} NODE_ENV=${config.env}  --app ${config.projectName}`,
		{ silent: true }
	);
	spinner.stopAndPersist({
		symbol: `🦄`,
		text: ` Setting up your ${chalk.magenta.bold(`Heroku`)} ${
			config.projectName
		} project variables \n`
	});
};
const _createApp = async () => {
	spinner.stopAndPersist({
		symbol: `🌍`,
		text: ` Setting up ${chalk.magenta.bold(
			`${config.projectName.toUpperCase()} Heroku`
		)} app on Heroku (${chalk.blue.bold(config.herokuRegion.toUpperCase())}) \n`
	});
	shell.exec(
		`HEROKU_API_KEY="${config.herokuApiToken}" heroku create ${config.projectName} --region ${config.herokuRegion}`
	);
};

const _createDatabase = async () => {
	shell.exec(
		`HEROKU_API_KEY="${config.herokuApiToken}" heroku addons:create heroku-postgresql:hobby-dev --app ${config.projectName}`,
		{ silent: true }
	);
	spinner.stopAndPersist({
		symbol: `💾`,
		text: ` Spinning up a PostgresSQL database and connecting it to ${chalk.magenta.bold(
			config.projectName.toUpperCase()
		)}  on ${chalk.magenta.bold(`Heroku`)}  \n`
	});
};

const destroyHerokuApp = async () => {
	spinner.stopAndPersist({
		symbol: `💀`,
		text: `Tearing down ${chalk.magenta.bold(
			config.projectName.toUpperCase()
		)} on Heroku  \n`
	});
	shell.exec(
		`HEROKU_API_KEY="${config.herokuApiToken}" heroku apps:destroy ${config.projectName} --confirm ${config.projectName}`
	);
	spinner.stopAndPersist({
		symbol: `🤠`,
		text: `Note from ${chalk.magenta(
			`heroku`
		)} here are the apps that are left on your heroku account 👇 \n`
	});
	shell.exec(`HEROKU_API_KEY="${config.herokuApiToken}" heroku apps`, {});
	console.log(`\n`);
};

const herokuSetup = async () => {
	_createApp();
	_createEnv();
	_createDatabase();
};

module.exports = {
	herokuSetup,
	destroyHerokuApp
};
