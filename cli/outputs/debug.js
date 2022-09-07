const chalk = require(`chalk`);
const { spinner } = require(`../../utils`);
const symbols = require(`log-symbols`);

const debugOutput = message => {
  spinner.start(``);
  spinner.stopAndPersist({
    symbol: symbols.warning,
    text: `${chalk.bold.orange.bold(`${message}`)} \n`
  });
};

module.exports = debugOutput;
