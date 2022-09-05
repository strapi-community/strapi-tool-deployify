#!/usr/bin/env node
const { cli, init, log, resetProvider } = require(`./cli`);
const {
  genericQuestions,
  configSetup,
  installDependecies
} = require(`./core/`);

const {
  detectPackageManager,
  goodbye,
  detectDownloadsAndStars,
  detectProjectType,
  config
} = require(`./utils`);
const { useTool } = require(`./providers/heroku`);

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;
(async () => {
  init({ clear });
  input.includes(`help`) && cli.showHelp(0);
  if (input.includes(`reset`)) {
    await resetProvider();

    await goodbye();
    return;
  }
  debug && log(flags);
  try {
    await detectDownloadsAndStars();
    await detectPackageManager();
    await detectProjectType();
    await genericQuestions();

    const { hooks } = require(`${config.providersDir}/${config.provider}`);

    const providerConfig = config.providers[config.provider];

    // init provider hooks
    config.hooks.addHooks(hooks);

    // trigger provider setup
    await configSetup();
    await installDependecies();
    await config.hooks.callHook(`prebuild`, providerConfig);
    await config.hooks.callHook(`build`, providerConfig);
    await config.hooks.callHook(`postbuild`, providerConfig);

    config.useDocker && (await useTool());

    await goodbye();
  } catch (error) {
    console.log(error);
    await goodbye(false);
  }
})();
