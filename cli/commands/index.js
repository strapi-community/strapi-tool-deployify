const generate = require(`./generate`);
const reset = require(`./reset`);
const help = require(`./help`);
const commands = {
  generate,
  reset,
  help
};

module.exports = commands;
