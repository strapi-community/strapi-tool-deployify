const chalk = require(`chalk`);
const { spinner, detect } = require(`../../../utils`);
const { buildConfig } = require(`../../../config`);
const { askResetQuestions } = require(`../../../core/questions`);
const { deleteEnvDirs } = require(`./deleteEnvDirs`);
const { triggerResetHooks } = require(`./triggerResetHooks`);

const reset = async () => {
  const projectType = await detect.projectType();

  const detectedProviderName = await detect.provider();
  console.log(detectedProviderName);

  const { environments, provider } = await askResetQuestions(
    detectedProviderName
  );

  const config = buildConfig({ projectType, provider });

  spinner.start(` 🦄  ${chalk.yellow(`Searching for our directories...`)} `);
  await deleteEnvDirs(environments);
  spinner.stopAndPersist({
    symbol: `🦄`,
    text: chalk.yellow(`Directory search completed`)
  });
  await triggerResetHooks(config);

  spinner.stopAndPersist({
    symbol: `🧹 `,
    text: `${chalk.yellow(`Project cleaned`)} \n`
  });
};

module.exports = { reset };
