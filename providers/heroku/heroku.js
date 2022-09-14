const chalk = require(`chalk`);
const { spinner, detect } = require(`../../utils`);
const { generateHerokuTemplate } = require(`./herokuTemplate`);
const outputs = require(`../../cli/outputs`);
const { generateHerokuServices } = require(`./generateHerokuServices`);
const { destroyHerokuApp } = require(`./destroyHerokuApp`);
const { herokuAuthenticate, netrcExists } = require(`./authentication`);
const { file } = require(`../../core`);

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
      if (!netrcExists()) await herokuAuthenticate();
    },
    async build({ config, providerConfig }) {
      if (config.useDocker) {
        await herokuSetup({ config, herokuConfig: providerConfig });
      }
    },
    async postbuild({ config, providerConfig }) {
      await generateHerokuServices({ config, herokuConfig: providerConfig });
    },
    async destroy({ config, providerConfig }) {
      await file.remove(providerConfig.outputFileName);
      await destroyHerokuApp({ config, herokuConfig: providerConfig });
    }
  }
};
