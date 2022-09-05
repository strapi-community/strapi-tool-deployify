const { config, spinner, chalk, detectHerokuCLI } = require(`../../utils`);
const shell = require(`shelljs`);
const { createHerokuFile } = require(`./herokuFile`);
const { herokuQuestions } = require(`../../core`);
const message = require(`../../cli/message`);

const _createEnv = async herokuConfig => {
  shell.exec(
    `HEROKU_API_KEY="${herokuConfig.apiToken}" heroku config:set WEBSITE_URL=$(heroku info -s | grep web_url | cut -d= -f2) APP_KEYS=${config.strapiSecrets.appKeys} API_TOKEN_SALT=${config.strapiSecrets.apiTokenSalt} ADMIN_JWT_SECRET=${config.strapiSecrets.adminJwtSecret} JWT_SECRET=${config.strapiSecrets.jwtSecret} NODE_ENV=${config.env}  --app ${config.projectName}`,
    { silent: true }
  );
  spinner.stopAndPersist({
    symbol: `⚙️`,
    text: `  Configuring ${chalk.magenta.bold(
      `${config.projectName.toUpperCase()}'s`
    )} enviroment variables ${_herokuWithRegion()}`
  });
};
const _createApp = async herokuConfig => {
  spinner.stopAndPersist({
    symbol: `🌍`,
    text: ` Spinning up ${chalk.magenta.bold(
      config.projectName.toUpperCase()
    )} app ${_herokuWithRegion()}`
  });
  shell.exec(
    `HEROKU_API_KEY="${herokuConfig.apiToken}" heroku create ${config.projectName} --region ${config.region}`
  );
};

const _createDatabase = async herokuConfig => {
  shell.exec(
    `HEROKU_API_KEY="${herokuConfig.apiToken}" heroku addons:create heroku-postgresql:hobby-dev --app ${config.projectName}`,
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
const _useContainer = async herokuConfig => {
  shell.exec(
    `HEROKU_API_KEY="${herokuConfig.apiToken}" stack:set container  --app ${config.projectName}`,
    { silent: true }
  );
  spinner.stopAndPersist({
    symbol: `🐳`,
    text: `  Configuring ${chalk.magenta.bold(
      `${config.projectName.toUpperCase()}'s`
    )} to use Docker ${_herokuWithRegion()}`
  });
};

const destroyHerokuApp = async herokuConfig => {
  spinner.stopAndPersist({
    symbol: `💀`,
    text: `Tearing down ${chalk.magenta.bold(
      config.projectName.toUpperCase()
    )} ${_herokuWithRegion()}`
  });
  shell.exec(
    `HEROKU_API_KEY="${herokuConfig.apiToken}" heroku apps:destroy ${config.projectName} --confirm ${config.projectName}`
  );
  spinner.stopAndPersist({
    symbol: `🤠`,
    text: `Note from ${chalk.magenta(
      `heroku`
    )} here are the apps that are left on your heroku account 👇 \n`
  });
  shell.exec(`HEROKU_API_KEY="${herokuConfig.apiToken}" heroku apps`, {});
  console.log(`\n`);
};

const _herokuWithRegion = () => {
  return `on ${chalk.magenta.bold(`Heroku`)} (${chalk.blue.bold(
    config.region.toUpperCase()
  )}) \n`;
};

module.exports = {
  herokuHooks: {
    async prebuild() {
      await message(`This tool will only create NEW project on heroku`);
      await detectHerokuCLI();
      await herokuQuestions(`deploy to`);
    },
    async build(herokuConfig) {
      await createHerokuFile(herokuConfig);
    },
    postbuild(herokuConfig) {
      _createApp(herokuConfig);
      config.useDocker && _useContainer(herokuConfig);
      _createEnv(herokuConfig);
      _createDatabase(herokuConfig);
    }
  },
  destroyHerokuApp
};
