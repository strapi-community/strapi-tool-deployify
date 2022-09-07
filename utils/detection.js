const path = require(`path`);
const shell = require(`shelljs`);
const chalk = require(`chalk`);
const os = require(`os`);
const { pathExists } = require(`fs-extra`);
const { setConfig, config } = require(`../config`);
const { spinner } = require(`./spinner`);
const child_process = require(`child_process`);
const { getApiKey } = require(`../providers/heroku/authentication`);
const { loadProviders, loadProviderConfig } = require(`../config`);

const projectType = async () => {
  const isTS = await pathExists(path.join(process.cwd(), `tsconfig.json`));

  if (isTS) {
    return `ts`;
  }

  return `js`;
};

const provider = async () => {
  const providers = loadProviders();

  let providerName = null;
  for (const provider in providers) {
    try {
      const providerConfig = loadProviderConfig(provider);
      const hasProviderGeneratedFile = await pathExists(
        providerConfig.outputFileName
      );
      if (hasProviderGeneratedFile) {
        providerName = providerConfig.name;
        break;
      }
    } catch (error) {}
  }

  return providerName;
};

const packageManager = async () => {
  const [isYarn, isNPM] = await Promise.all([
    pathExists(`yarn.lock`),
    pathExists(`package-lock.json`)
  ]);

  if (isYarn) {
    return `yarn`;
  }

  if (isNPM) {
    return `npm`;
  }

  return `unknown`;
};

const herokuCLI = async () => {
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
  packageManager,
  projectType,
  provider,
  herokuCLI
};
