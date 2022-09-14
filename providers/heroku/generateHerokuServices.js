const chalk = require(`chalk`);
const shell = require(`shelljs`);
const { spinner } = require(`../../utils`);

const generateHerokuServices = async ({ config, herokuConfig }) => {
  await generateApp({ config, herokuConfig });
  if (config.useDocker) await generateContainer({ config, herokuConfig });
  await generateEnv({ config, herokuConfig });
  await generateDB({ config, herokuConfig });
};

const generateEnv = async ({ config, herokuConfig }) => {
  shell.exec(
    `HEROKU_API_KEY="${herokuConfig.apiToken}" heroku config:set WEBSITE_URL=$(heroku info -s --app=${config.projectName} | grep web_url | cut -d= -f2) APP_KEYS=${config.strapiSecrets.appKeys} API_TOKEN_SALT=${config.strapiSecrets.apiTokenSalt} ADMIN_JWT_SECRET=${config.strapiSecrets.adminJwtSecret} JWT_SECRET=${config.strapiSecrets.jwtSecret} NODE_ENV=${config.env}  --app ${config.projectName}`,
    { silent: true }
  );
  spinner.stopAndPersist({
    symbol: `⚙️`,
    text: `  Configuring ${chalk.magenta.bold(
      `${config.projectName.toUpperCase()}'s`
    )} enviroment variables on ${chalk.magenta.bold(
      `Heroku`
    )} (${chalk.blue.bold(config.region.toUpperCase())})`
  });
};

const generateApp = async ({ config, herokuConfig }) => {
  spinner.stopAndPersist({
    symbol: `🌍`,
    text: ` Spinning up ${chalk.magenta.bold(
      config.projectName.toUpperCase()
    )} app on ${chalk.magenta.bold(`Heroku`)} (${chalk.blue.bold(
      config.region.toUpperCase()
    )})`
  });
  shell.exec(
    `HEROKU_API_KEY="${herokuConfig.apiToken}" heroku create ${config.projectName} --region ${config.region}`
  );
};

const generateDB = async ({ config, herokuConfig }) => {
  shell.exec(
    `HEROKU_API_KEY="${herokuConfig.apiToken}" heroku addons:create heroku-postgresql:hobby-dev --app ${config.projectName}`,
    { silent: true }
  );
  spinner.stopAndPersist({
    symbol: `🧚`,
    text: ` Spinning up a PostgresSQL database on ${chalk.magenta.bold(
      `Heroku`
    )} (${chalk.blue.bold(config.region.toUpperCase())})`
  });
  spinner.stopAndPersist({
    symbol: `🔗`,
    text: ` Linking your new Database to ${chalk.magenta.bold(
      config.projectName.toUpperCase()
    )} project on ${chalk.magenta.bold(`Heroku`)} (${chalk.blue.bold(
      config.region.toUpperCase()
    )})`
  });
};

const generateContainer = async ({ config, herokuConfig }) => {
  shell.exec(
    `HEROKU_API_KEY="${herokuConfig.apiToken}" stack:set container  --app ${config.projectName}`,
    { silent: true }
  );
  spinner.stopAndPersist({
    symbol: `🐳`,
    text: `  Configuring ${chalk.magenta.bold(
      `${config.projectName.toUpperCase()}'s`
    )} to use Docker on ${chalk.magenta.bold(`Heroku`)} (${chalk.blue.bold(
      config.region.toUpperCase()
    )})`
  });
};

module.exports = {
  generateHerokuServices
};
