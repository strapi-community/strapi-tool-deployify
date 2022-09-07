const chalk = require(`chalk`);
const { spinner, detect } = require(`../../utils`);
const { generateHerokuTemplate } = require(`./herokuFile`);
const { outputs } = require(`../../cli`);
const { generateHerokuServices } = require(`./generateHerokuServices`);
const { destroyHerokuApp } = require(`./destroyHerokuApp`);

const herokuSetup = async ({ config, herokuConfig }) => {
  outputs.info(`Generating heroku configuration file`);

  const generatedTemplate = await generateHerokuTemplate({
    config,
    herokuConfig
  });

  if (!generatedTemplate) {
    outputs.error(`Unable to generate render template`);
  }

  spinner.stopAndPersist({
    symbol: `⚙️ `,
    text: `Added and configured ${chalk.bold.green(
      config.provider.toUpperCase()
    )} to project \n`
  });
};

module.exports = {
  herokuHooks: {
    async prebuild() {
      await outputs.info(`This tool will only create NEW project on heroku`);
      await detect.herokuCLI();
    },
    async build({ config, herokuConfig }) {
      await herokuSetup({ config, herokuConfig });
    },
    async postbuild({ config, herokuConfig }) {
      await generateHerokuServices({ config, herokuConfig });
    },
    async destroy() {
      await destroyHerokuApp();
    }
  }
};
