const { spinner, chalk } = require(`../utils`);
const infoMessage = async message => {
  spinner.start(``);
  spinner.stopAndPersist({
    symbol: `💁`,
    text: ` ${chalk.bold.blue.bold(`${message}`)} \n`
  });
};

module.exports = infoMessage;
