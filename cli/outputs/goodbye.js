const chalk = require(`chalk`);
const { spinner } = require(`../../utils`);
const { pkg } = require(`../../package.json`);
const { getGithubStats } = require(`../../utils/stats`);

const goodbyeOutput = async ({ quit = false }) => {
  if (quit) {
    spinner.stopAndPersist({
      symbol: `☝️`,
      text: `  ${chalk.yellow(`Strapi`)} is now ${chalk.bold.blueBright(
        `deployified`
      )} 🐳 - have a look at the logs above for more info. 🚀 \n`
    });
  }
  spinner.stopAndPersist({
    symbol: `⭐️`,
    text: ` ${chalk.bold.green(
      `Star the project on GitHub if you liked this tool 🙏 \n`
    )}`
  });

  try {
    const { stars } = await getGithubStats();
    spinner.stopAndPersist({
      symbol: `🎉`,
      text: ` ${chalk.bold.yellow(
        `We now have got ${stars || 0} 🌟 and counting... \n`
      )} `
    });
  } catch (error) {}

  console.log(`👉  ${pkg.url} 👈 \n`);
};

module.exports = goodbyeOutput;
