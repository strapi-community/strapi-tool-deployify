const chalk = require(`chalk`);
const { spinner, detect } = require(`../../../utils`);

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
  const projectType = await detect.projectType();
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

module.exports = {
  getDetectableSettings
};
