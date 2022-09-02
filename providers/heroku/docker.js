const shell = require(`shelljs`);
const {
  config,
  spinner,
  chalk,
  replace,
  generateError
} = require(`../../utils`);

const useTool = async () => {
  shell.exec(
    `npx @strapi-community/dockerize new --usecompose=false --env=${config.env} --projecttype=${config.projectType} --packageManager=${config.packageManager} --dbtype=postgres`,
    { silent: true }
  );
  config.env === `development` && (await _updateHerokuFile());
  spinner.stopAndPersist({
    symbol: `🐳`,
    text: ` Adding ${chalk.blue.bold(
      `Dockerfile${config.env === `production` ? `.prod` : ``}`
    )} file to project  \n`
  });
};

const _updateHerokuFile = async env => {
  const options = {
    files: `${config.outDir}/heroku.yml`,
    from: [/Dockerfile.prod/i, /production/i],
    to: [`Dockerfile`, `development`]
  };

  try {
    await replace(options);
    spinner.stopAndPersist({
      symbol: `⚙️`,
      text: ` Configuring   ${chalk.yellow.bold(`heroku.yml`)} \n`
    });
  } catch (error) {
    await generateError(error);
  }
};
module.exports = { useTool };
