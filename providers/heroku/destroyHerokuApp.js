const chalk = require(`chalk`);
const shell = require(`shelljs`);
const { spinner } = require(`../../utils`);
const prompts = require(`prompts`);

const destroyHerokuApp = async ({ config, herokuConfig }) => {
  const test = shell.exec(
    `HEROKU_API_KEY="${herokuConfig.apiToken}" heroku apps --json -p`,
    { silent: true }
  );

  // map over test and return title and value
  const herokuApps = JSON.parse(test.stdout).map(app => {
    return {
      title: app.name,
      value: app.name
    };
  });
  let { apps } = await prompts([
    {
      type: `multiselect`,
      name: `apps`,
      message: `Pick the environments to clean`,
      choices: herokuApps,
      min: 1,
      hint: `- Space to select. Return to submit`
    }
  ]);
  for (const app of apps) {
    spinner.start(` 🦄  Tearing down ${chalk.magenta.bold(app.toUpperCase())}`);
    shell.exec(
      `HEROKU_API_KEY="${herokuConfig.apiToken}" heroku apps:destroy ${app} --confirm ${app}`,
      { silent: true }
    );
    spinner.stopAndPersist({
      symbol: `💀`,
      text: ` Teared ${chalk.yellow(app)} down from strapi \n`
    });
  }

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
