#!/usr/bin/env node

/**
 * strapi-tool-strapi-tool-deployify
 * Add docker support for a Strapi Project
 *
 * @author Simen Daehlin <https://dehlin.dev>
 */

const { cli, init, log, message, resetHeroku, resetFiles } = require(`./cli`);
const questions = require(`./core/questions`);

const {
  detectPackageManager,
  goodbye,
  detectDownloadsAndStars,
  detectProjectType,
  config
} = require(`./utils`);
const { useTool } = require(`./providers/heroku`);
const { selectProvider } = require(`./providers/selectProvider`);
const { installDependecies, configSetup } = require(`./core`);

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;
const { liquidEngine } = require(`./providers/render/render`);
(async () => {
  init({ clear });
  input.includes(`help`) && cli.showHelp(0);
  if (input.includes(`reset`)) {
    await resetHeroku();
    await resetFiles();
    await goodbye();
    return;
  }
  debug && log(flags);
  try {
    await detectDownloadsAndStars();
    await detectPackageManager();
    await detectProjectType();

    await message(`This tool will only create NEW project on heroku`);
    await questions();
    config.useDocker && (await useTool());
    await configSetup();
    await installDependecies();
    await selectProvider();

    await goodbye();
  } catch (error) {
    console.log(error);
    await goodbye(false);
  }
})();
