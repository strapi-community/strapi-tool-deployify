const chalk = require(`chalk`);
const { spinner } = require(`../../utils`);
const pkg = require(`../../package.json`);
const stats = require(`../../utils/stats`);

const welcomeOuput = async () => {
  const bg = chalk.hex(`#ffffff`).inverse.bold;
  const clr = chalk.hex(`#000000`).bold;

  // Do it.
  console.log();
  console.log(
    `${clr(`${bg(` ${`@strapi-community/deployify`} `)}`)} v${
      pkg.version
    } ${chalk.dim(`by Simen Daehlin`)}\n${chalk.dim(
      `${pkg.description}\n${pkg.url}`
    )}`
  );
  console.log();

  try {
    const { downloads } = await stats.getNPMStats();
    spinner.stopAndPersist({
      symbol: `🎉`,
      text: ` ${chalk.bold.yellow(`You`)}, and ${chalk.bold.green(
        downloads || `large amount of`
      )} other people have used this tool this month\n`
    });
  } catch (error) {}
};

module.exports = welcomeOuput;
