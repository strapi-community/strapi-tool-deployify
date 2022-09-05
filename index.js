#!/usr/bin/env node
const { commands, outputs, getArgs } = require(`./cli`);
const args = getArgs();
const { input, flags } = args;
const { clear, debug } = flags;

(() => {
  // clear console
  if (clear) {
    console.clear();
  }

  outputs.welcome();

  if (debug) {
    outputs.debug(args);
  }

  // retrieve command
  let cmd = commands[input];

  // default to generate
  if (!cmd) {
    cmd = commands[`generate`];
  }

  let commandSucess = true;
  try {
    // invoke command found
    cmd.invoke(args);
  } catch (error) {
    commandSucess = false;
    outputs.error(error);
  }

  outputs.goodbye({ quit: commandSucess });
})();

process.on(`unhandledRejection`, err => {
  outputs.error(err);
});
