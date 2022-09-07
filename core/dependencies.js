const chalk = require(`chalk`);
const { pathExists } = require(`fs-extra`);
const shell = require(`shelljs`);
const { outputs } = require(`../cli`);
const { spinner } = require(`../utils`);

const installDependencies = async packageManager => {
  try {
    spinner.start(`📦 Checking if dependencies already installed ...`);
    const dependenciesInstalled = await hasOldDependencies();
    if (dependenciesInstalled) {
      spinner.stopAndPersist({
        symbol: `📦 `,
        text: `dependencies already installed, skipping install \n`
      });
      return;
    }

    spinner.start(
      ` 📦 Installing dependencies using ${chalk.bold.yellow(
        packageManager.toUpperCase()
      )}...`
    );

    const installCommand = packageManager === `yarn` ? `add` : `install`;
    shell.exec(`${packageManager} ${installCommand} pg pg-connection-string`, {
      silent: true
    });
    outputs.success(`All dependencies installed`);
  } catch (err) {
    outputs.error(err);
  }
};

const hasOldDependencies = async () => {
  const isReadablePkg = await pathExists(`package.json`);
  if (!isReadablePkg) {
    return false;
  }

  const pkg = require(`${process.cwd()}/package.json`);
  if (pkg.dependencies[`pg`] || pkg.dependencies[`pg-connection-string`]) {
    return true;
  }
};

module.exports = { installDependencies };
