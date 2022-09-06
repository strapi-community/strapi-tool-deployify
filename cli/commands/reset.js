const chalk = require(`chalk`);
const { unlink, rm } = require(`fs/promises`);
const { pathExists, spinner, detect } = require(`../../utils`);
const {
  buildConfig,
  loadProviders,
  loadProviderConfig
} = require(`../../config`);

const getRemovableFiles = config => {
  return config.files(generatedFile => ({
    directory: `${process.cwd()}`,
    file: `${generatedFile}.${config.projectType}`
  }));
};

const reset = async () => {
  const projectType = await detect.projectType();

  const config = buildConfig({ projectType });

  await deleteGeneratedFiles(config);
  await deleteGenerateDirectories();
  await deleteProviderFiles(config);

  spinner.stopAndPersist({
    symbol: `🧹`,
    text: ` ${chalk.yellow(`Project cleaned`)} \n`
  });
};

const deleteGeneratedFiles = async config => {
  const removableFiles = getRemovableFiles(config);

  spinner.start(` 🦄  ${chalk.yellow(`Searching for our files...`)} `);
  for (let file of removableFiles) {
    try {
      const isExistingFile = await pathExists(`${file.directory}/${file.file}`);
      if (isExistingFile) {
        await unlink(`${file.directory}/${file.file}`);
        spinner.stopAndPersist({
          symbol: `🧹`,
          text: ` Cleaned up ${chalk.yellow(file.file)} \n`
        });
      }
    } catch (error) {}
  }
};

const deleteProviderFiles = async config => {
  const providers = loadProviders();
  let providerConfig;
  for (const provider in providers) {
    try {
      providerConfig = loadProviderConfig(provider);
      const detectedProvider = detect.provider(providerConfig);
      if (detectedProvider) {
        break;
      }
    } catch (error) {}
  }

  // setup hooks
  const { hooks } = require(`${config.providersDir}/${providerConfig.name}`);
  // init provider hooks
  config.hooks.addHooks(hooks);

  // trigger provider specific destroy
  await config.hooks.callHook(`destroy`, { providerConfig, config });
};

const deleteGenerateDirectories = async () => {
  spinner.start(` 🦄  ${chalk.yellow(`Searching for our directories...`)} `);
  const directory = `${process.cwd()}/config/env`;
  try {
    const isExistingDirectory = await pathExists(directory);
    if (isExistingDirectory) {
      await rm(directory, { recursive: true });
    }
    spinner.stopAndPersist({
      symbol: `🧹`,
      text: ` Cleand up ${chalk.yellow(`env`)} folder \n`
    });
  } catch (error) {}
};

module.exports = { name: `reset`, invoke: reset };
