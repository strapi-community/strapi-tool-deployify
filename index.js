#!/usr/bin/env node
const { cli, init, log, resetProvider } = require(`./cli`);
const { genericQuestions } = require(`./core/`);

const {
  detectPackageManager,
  goodbye,
  detectDownloadsAndStars,
  detectProjectType,
  config
} = require(`./utils`);
const { useTool } = require(`./providers/heroku`);
const { selectProvider } = require(`./providers/selectProvider`);

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
    await selectProvider();
    config.useDocker && (await useTool());

    await goodbye();
  } catch (error) {
    console.log(error);
    await goodbye(false);
  }
})();
