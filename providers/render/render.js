const chalk = require(`chalk`);
const { resolve } = require(`path`);
const { Liquid } = require(`liquidjs`);
const { config, spinner } = require(`../../utils`);
const fs = require(`fs-extra`);
const { renderQuestions } = require(`../../core`);

const liquidEngine = new Liquid({
  root: resolve(__dirname, `templates`),
  extname: `.liquid`
});

const renderSetup = async renderConfig => {
  try {
    const template = liquidEngine.renderFileSync(`render`, {
      name: config.projectName,
      env: config.env,
      nodeVersion: +process.version.match(/^v(\d+\.\d+)/)[1],
      region: config.region,
      docker: config.useDocker
    });
    const file = fs.createWriteStream(
      `${config.outDir}/${renderConfig.outputFileName}`
    );
    file.write(template);
    file.end();

    await spinner.stopAndPersist({
      symbol: `⚙️`,
      text: ` Added and configured ${chalk.bold.green(
        config.provider.toUpperCase()
      )} to project \n`
    });
    await spinner.stopAndPersist({
      symbol: `🚀`,
      text: ` Project is now ready, just push to your version control provider.
🚀  visit https://dashboard.render.com/select-repo?type=blueprint
🚀  where you can connect your repo and deploy your app \n`
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  renderHooks: {
    async prebuild() {
      await renderQuestions();
    },
    async build(renderConfig) {
      await renderSetup(renderConfig);
    }
  }
};
