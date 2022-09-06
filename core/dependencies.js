const shell = require(`shelljs`);
const {
  spinner,
  chalk,
  access,
  constants,
  generateError,
  config
} = require(`../utils`);
const installDependecies = async () => {
  try {
    const dependenciesInstalled = await checkForOldDependecies();
    if (dependenciesInstalled === null) return;
    if (dependenciesInstalled) {
      spinner.stopAndPersist({
        symbol: `📦`,
        text: ` All dependencies are installed not doing anything \n`
      });
      return;
    }

    spinner.start(
      ` 📦 Installing dependencies using ${chalk.bold.yellow(
        config.packageManager.toUpperCase()
      )}...`
    );

    shell.exec(
      `${config.packageManager} ${
        config.packageManager === `yarn` ? `add` : `install`
      } pg pg-connection-string`,
      { silent: true }
    );
  } catch (error) {
    await generateError(error);
  }
};
const checkForOldDependecies = async () => {
  try {
    spinner.start(` 📦 Checking for old dependencies...`);

    await access(`package.json`, constants.R_OK);

    const pkg = require(`${process.cwd()}/package.json`);
    if (pkg.dependencies[`pg`] || pkg.dependencies[`pg-connection-string`]) {
      return true;
    }
    return false;
  } catch (error) {
    spinner.stopAndPersist({
      symbol: `📦`,
      text: ` We can't access package.json \n`
    });
    return null;
  }
};
module.exports = installDependecies;
