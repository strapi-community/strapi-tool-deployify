const { chalk } = require(`../../utils`);
const pkg = require(`../../package.json`);

const welcomeOuput = () => {
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
};

module.exports = welcomeOuput;
