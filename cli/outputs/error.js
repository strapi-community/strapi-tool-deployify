const chalk = require(`chalk`);
const { spinner } = require(`../../utils`);
const symbols = require(`log-symbols`);

const errorOuput = message => {
  spinner.start(``);
  spinner.stopAndPersist({
    symbol: symbols.error,
    text: `${chalk.bold.red.bold(`${message}`)} \n`
  });
};

module.exports = errorOuput;
