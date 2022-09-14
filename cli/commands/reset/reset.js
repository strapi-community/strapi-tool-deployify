const chalk = require(`chalk`);
const { spinner, detect } = require(`../../../utils`);
const { buildConfig } = require(`../../../config`);
const { askResetQuestions } = require(`../../../core/questions`);
const { deleteEnvDirs } = require(`./deleteEnvDirs`);
const { triggerResetHooks } = require(`./triggerResetHooks`);

const reset = async () => {
  const projectType = await detect.projectType();

  const detectedProviderName = await detect.provider();
  const { environments, provider } = await askResetQuestions(
    detectedProviderName
  );

  const config = buildConfig({ projectType, provider });

  spinner.start(` 🦄  ${chalk.yellow(`Searching for our directories...`)} `);
  await deleteEnvDirs(environments);
  spinner.stopAndPersist({
    symbol: `🦄`,
    text: ` Directory search ${chalk.yellow(` completed`)} \n`
  });
  await triggerResetHooks(config);

  spinner.stopAndPersist({
    symbol: `🧹 `,
    text: `Project ${chalk.yellow(`cleaned`)} \n`
  });
};

module.exports = { reset };
