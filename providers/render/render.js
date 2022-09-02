const { resolve } = require(`path`);
const { Liquid } = require(`liquidjs`);
const { config, spinner, chalk } = require(`../../utils`);
const fs = require(`fs-extra`);

const liquidEngine = new Liquid({
  root: resolve(__dirname, `templates`),
  extname: `.liquid`
});

const renderConfig = async () => {
  try {
    const template = liquidEngine.renderFileSync(`render`, {
      name: config.projectName,
      env: config.env,
      nodeVersion: +process.version.match(/^v(\d+\.\d+)/)[1]
    });
    const file = fs.createWriteStream(`${config.outDir}/render.yaml`);
    file.write(template);
    file.end();

    await spinner.stopAndPersist({
      symbol: `🚀`,
      text: ` Added ${chalk.bold.green(
        config.provider.toUpperCase()
      )} configuration file to project \n`
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { renderConfig };
