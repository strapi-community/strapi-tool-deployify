const { spinner, chalk } = require(`../../utils`);
const symbols = require(`log-symbols`);

const infoOuput = message => {
  spinner.start(``);
  spinner.stopAndPersist({
    symbol: symbols.info,
    text: `${chalk.bold.blue.bold(`${message}`)} \n`
  });
};

module.exports = infoOuput;
