const { resolve } = require(`path`);
const fs = require(`fs-extra`);
const { Liquid } = require(`liquidjs`);
const { config, spinner, chalk } = require(`../../utils`);

const liquidEngine = new Liquid({
  root: resolve(__dirname, `templates`),
  extname: `.liquid`
});

const createHerokuFile = async () => {
  try {
    const template = liquidEngine.renderFileSync(`heroku`, {
      dockerFile:
        config.env === `production` ? `Dockerfile.prod` : `Dockerfile`,
      env: config.env
    });
    const file = fs.createWriteStream(`${config.outDir}/heroku.yml`);
    file.write(template);
    file.end();

    await spinner.stopAndPersist({
      symbol: `⚙️`,
      text: ` Added and configured ${chalk.bold.green(
        config.provider.toUpperCase()
      )} to project \n`
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { createHerokuFile };
