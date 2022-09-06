const generateError = require(`./bugreport`);
const { setConfig, config } = require(`./config`);
const { spinner, replace, access, constants, copyFile } = require(`./utils`);
const detect = require(`./detection`);

module.exports = {
  spinner,
  replace,
  access,
  constants,
  copyFile,
  generateError,
  setConfig,
  config,
  detect
};
