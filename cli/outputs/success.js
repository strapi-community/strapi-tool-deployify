const chalk = require(`chalk`);
const { spinner } = require(`../../utils`);
const symbols = require(`log-symbols`);

const successOuput = message => {
  spinner.start(``);
  spinner.stopAndPersist({
    symbol: symbols.success,
    text: `${chalk.bold.blue.bold(`${message}`)} \n`
  });
};

module.exports = successOuput;
