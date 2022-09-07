const chalk = require(`chalk`);
const shell = require(`shelljs`);
const { spinner } = require(`../../utils`);

const destroyHerokuApp = async ({ config, herokuConfig }) => {
  const projectName = config.projectName;

  spinner.stopAndPersist({
    symbol: `💀 `,
    text: `Tearing down ${chalk.magenta.bold(
      projectName.toUpperCase()
    )} on ${chalk.magenta.bold(`Heroku`)} (${chalk.blue.bold(
      config.region.toUpperCase()
    )})`
  });

  shell.exec(
    `HEROKU_API_KEY="${herokuConfig.apiToken}" heroku apps:destroy ${projectName} --confirm ${projectName}`
  );

  spinner.stopAndPersist({
    symbol: `🤠 `,
    text: `Note from ${chalk.magenta(
      `heroku`
    )} here are the apps that are left on your heroku account 👇 \n`
  });
  shell.exec(`HEROKU_API_KEY="${herokuConfig.apiToken}" heroku apps`, {});
  console.log(`\n`);
};

module.exports = {
  destroyHerokuApp
};
