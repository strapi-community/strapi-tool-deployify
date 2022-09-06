const path = require(`path`);
const { spinner, chalk, constants, access } = require(`./utils`);
const shell = require(`shelljs`);
const { setConfig, config } = require(`./config`);
const fetch = require(`node-fetch`);
const child_process = require(`child_process`);
const { getApiKey } = require(`../providers/heroku/apiKey`);



  }
};
const detectProjectType = async () => {
  spinner.start(` 💻 Detecting Project type... `);
  try {
    if (config.quickStart) {
      spinner.stopAndPersist({
        symbol: `🍿`,
        text: ` ${
          config.projectType === `ts`
            ? `${chalk.bold.blueBright(`TypeScript`)}`
            : `${chalk.bold.yellow(`JavaScript`)}`
        } set by cli arguments \n`
      });
      return;
    }
    await access(path.join(process.cwd(), `tsconfig.json`));
    setConfig({ projectType: `ts` });
  } catch (error) {}

  if (!config.quickStart) {
    spinner.stopAndPersist({
      symbol: `🍿`,
      text: ` ${
        config.projectType === `ts`
          ? `${chalk.bold.blueBright(`TypeScript`)}`
          : `${chalk.bold.yellow(`JavaScript`)}`
      } project detected \n`
    });
  }
};

const detectPackageManager = async () => {
  spinner.start(` 💻 Detecting package manager... `);
  try {
    if (config.quickStart) {
      spinner.stopAndPersist({
        symbol: `🍿`,
        text: ` ${
          config.packageManager === `yarn`
            ? `${chalk.bold.yellow(`Yarn`)}`
            : `${chalk.bold.greenBright(`NPM`)}`
        } set by cli arguments \n`
      });
      return;
    }
    await access(`yarn.lock`, constants.R_OK);
    setConfig({ packageManager: `yarn` });
  } catch (error) {
    setConfig({ packageManager: `npm` });
  }
  if (!config.quickStart) {
    spinner.stopAndPersist({
      symbol: `📦`,
      text: ` ${chalk.bold.yellow(
        config.packageManager.toUpperCase()
      )} detected \n`
    });
  }
};

const detectHerokuCLI = async () => {
  const herokuCLI = await shell.which(`heroku`);
  if (herokuCLI) {
    setConfig({ herokuCLI: true });

    spinner.stopAndPersist({
      symbol: `💻`,
      text: ` ${chalk.bold.magenta(`Heroku`)} CLI detected \n`
    });
    await getApiKey();
    if (!config.providers.heroku.apiToken) {
      child_process.execFileSync(`heroku`, [`login`], { stdio: `inherit` });
      await getApiKey();
    }
  } else {
    spinner.stopAndPersist({
      symbol: `💻`,
      text: ` ${chalk.bold.magenta(
        `Heroku`
      )} CLI not detected, installing the tool \n`
    });
    shell.exec(`npm install -g heroku`, { silent: true });
    spinner.stopAndPersist({
      symbol: `🪄`,
      text: ` Please login to ${chalk.magenta.bold(`Heroku`)} to continue 👇 \n`
    });
    child_process.execFileSync(`heroku`, [`login`], { stdio: `inherit` });
  }
};

module.exports = {
  detectPackageManager,
  detectProjectType,
  detectDownloadsAndStars,
  detectHerokuCLI
};
