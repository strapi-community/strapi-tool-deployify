const chalk = require(`chalk`);
const { spinner } = require(`../../utils`);
const { renderQuestions } = require(`../../core`);
const { outputs } = require(`../../cli/outputs`);
const { generateRenderTemplate } = require(`./renderFile`);

const renderSetup = async ({ config, renderConfig }) => {
  outputs.info(`Generating render configuration file`);

  const generatedTemplate = await generateRenderTemplate({
    config,
    renderConfig
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

  spinner.stopAndPersist({
    symbol: `🚀 `,
    text: `Project is now ready, just push to your version control provider.
🚀  visit https://dashboard.render.com/select-repo?type=blueprint
🚀  where you can connect your repo and deploy your app \n`
  });
};

module.exports = {
  renderHooks: {
    async prebuild() {
      await renderQuestions();
    },
    async build({ config, renderConfig }) {
      await renderSetup({ config, renderConfig });
    }
  }
};
