const generateError = require(`./bugreport`);
const { setConfig, config } = require(`./config`);
const {
  spinner,
  replace,
  chalk,
  access,
  constants,
  copyFile
} = require(`./utils`);
const detect = require(`./detection`);

module.exports = {
  spinner,
  replace,
  chalk,
  access,
  constants,
  copyFile,
  generateError,
  setConfig,
  config,
  detect
};
