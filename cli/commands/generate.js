const { buildConfig, loadProviderConfig } = require(`../../config`);
const {
  configSetup,
  installDependencies,
  generateDockerFile
} = require(`../../core`);
const { askGenerateQuestions } = require(`../../core/questions`);
const { detect, spinner, chalk } = require(`../../utils`);

const getDetectableSettings = async () => {
  // package manager
  spinner.start(` 💻 Detecting package manager... `);
  const packageManager = await detect.packageManager();
  spinner.stopAndPersist({
    symbol: `📦 `,
    text: `${chalk.bold.yellow(packageManager.toUpperCase())} detected \n`
  });

  // project type
  spinner.start(` 💻 Detecting Project type... `);
  const projectType = detect.projectType();
  const projectTypeColoredText =
    projectType === `ts`
      ? chalk.bold.blueBright(`TypeScript`)
      : chalk.bold.yellow(`JavaScript`);
  spinner.stopAndPersist({
    symbol: `🍿 `,
    text: `${projectTypeColoredText} project detected \n`
  });

  return {
    packageManager,
    projectType
  };
};

const generate = async () => {
  const { packageManager, projectType } = getDetectableSettings();

  const generateAnswers = await askGenerateQuestions();

  // load configs
  let config = buildConfig({
    ...generateAnswers,
    packageManager,
    projectType
  });
  const providerConfig = loadProviderConfig(config.provider);

  // setup hooks
  const { hooks } = require(`${config.providersDir}/${config.provider}`);
  // init provider hooks
  config.hooks.addHooks(hooks);

  // trigger provider setup
  // provider specific pre build
  await config.hooks.callHook(`prebuild`, { providerConfig, config });

  // general internal build
  await configSetup();
  await installDependencies();

  // provider specific build
  await config.hooks.callHook(`build`, { providerConfig, config });

  // provider specific post build
  await config.hooks.callHook(`postbuild`, { providerConfig, config });

  // generate docker file
  if (config.useDocker) {
    await generateDockerFile(config);
  }
};

module.exports = { invoke: generate };
