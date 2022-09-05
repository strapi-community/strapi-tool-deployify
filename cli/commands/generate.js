const {
  genericQuestions,
  configSetup,
  installDependecies,
  useTool
} = require(`../../core`);
const {
  config,
  detectDownloadsAndStars,
  detectPackageManager,
  detectProjectType
} = require(`../../utils`);
const generate = async () => {
  await detectDownloadsAndStars();
  await detectPackageManager();
  await detectProjectType();
  await genericQuestions();

  const { hooks } = require(`${config.providersDir}/${config.provider}`);

  const providerConfig = config.providers[config.provider];

  // init provider hooks
  config.hooks.addHooks(hooks);

  // trigger provider setup
  // provider specific pre build
  await config.hooks.callHook(`prebuild`, providerConfig);

  // general internal build
  await configSetup();
  await installDependecies();

  // provider specific build
  await config.hooks.callHook(`build`, providerConfig);

  // provider specific post build
  await config.hooks.callHook(`postbuild`, providerConfig);

  config.useDocker && (await useTool());
};

module.exports = { invoke: generate };
