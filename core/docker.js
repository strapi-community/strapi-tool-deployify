const shell = require(`shelljs`);
const { config, spinner, chalk } = require(`../utils`);

const useTool = async () => {
  shell.exec(
    `npx @strapi-community/dockerize new --usecompose=false --env=${config.env} --projecttype=${config.projectType} --packageManager=${config.packageManager} --dbtype=postgres`,
    { silent: true }
  );

  spinner.stopAndPersist({
    symbol: `🐳`,
    text: ` Adding ${chalk.blue.bold(
      `Dockerfile${config.env === `production` ? `.prod` : ``}`
    )} file to project  \n`
  });
};

module.exports = { useTool };
