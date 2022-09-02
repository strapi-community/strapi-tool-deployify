const { config, spinner, chalk } = require(`../../utils`);
const shell = require(`shelljs`);

const _createEnv = async () => {
  shell.exec(
    `HEROKU_API_KEY="${config.apiToken}" heroku config:set WEBSITE_URL=$(heroku info -s | grep web_url | cut -d= -f2) APP_KEYS=${config.strapiSecrets.appKeys} API_TOKEN_SALT=${config.strapiSecrets.apiTokenSalt} ADMIN_JWT_SECRET=${config.strapiSecrets.adminJwtSecret} JWT_SECRET=${config.strapiSecrets.jwtSecret} NODE_ENV=${config.env}  --app ${config.projectName}`,
    { silent: true }
  );
  spinner.stopAndPersist({
    symbol: `⚙️`,
    text: ` Configuring ${chalk.magenta.bold(
      `${config.projectName.toUpperCase()}'s`
    )} enviroment variables ${_herokuWithRegion()}`
  });
};
const _createApp = async () => {
  spinner.stopAndPersist({
    symbol: `🌍`,
    text: ` Spinning up ${chalk.magenta.bold(
      config.projectName.toUpperCase()
    )} app ${_herokuWithRegion()}`
  });
  shell.exec(
    `HEROKU_API_KEY="${config.apiToken}" heroku create ${config.projectName} --region ${config.region}`
  );
};

const _createDatabase = async () => {
  shell.exec(
    `HEROKU_API_KEY="${config.apiToken}" heroku addons:create heroku-postgresql:hobby-dev --app ${config.projectName}`,
    { silent: true }
  );
  spinner.stopAndPersist({
    symbol: `🧚`,
    text: ` Spinning up a PostgresSQL database ${_herokuWithRegion()} `
  });
  spinner.stopAndPersist({
    symbol: `🔗`,
    text: ` Linking your new Database to ${chalk.magenta.bold(
      config.projectName.toUpperCase()
    )} project ${_herokuWithRegion()}`
  });
};
const _useContainer = async () => {
  shell.exec(
    `HEROKU_API_KEY="${config.apiToken}" stack:set container  --app ${config.projectName}`,
    { silent: true }
  );
  spinner.stopAndPersist({
    symbol: `🐳`,
    text: `  Configuring ${chalk.magenta.bold(
      `${config.projectName.toUpperCase()}'s`
    )} to use Docker ${_herokuWithRegion()}`
  });
};

const destroyHerokuApp = async () => {
  spinner.stopAndPersist({
    symbol: `💀`,
    text: `Tearing down ${chalk.magenta.bold(
      config.projectName.toUpperCase()
    )} ${_herokuWithRegion()}`
  });
  shell.exec(
    `HEROKU_API_KEY="${config.apiToken}" heroku apps:destroy ${config.projectName} --confirm ${config.projectName}`
  );
  spinner.stopAndPersist({
    symbol: `🤠`,
    text: `Note from ${chalk.magenta(
      `heroku`
    )} here are the apps that are left on your heroku account 👇 \n`
  });
  shell.exec(`HEROKU_API_KEY="${config.apiToken}" heroku apps`, {});
  console.log(`\n`);
};

const _herokuWithRegion = () => {
  return `on ${chalk.magenta.bold(`Heroku`)} (${chalk.blue.bold(
    config.region.toUpperCase()
  )}) \n`;
};

const herokuSetup = async () => {
  _createApp();
  config.useDocker && _useContainer();
  _createEnv();
  _createDatabase();
};

module.exports = {
  herokuSetup,
  destroyHerokuApp
};
