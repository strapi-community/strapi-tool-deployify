const generateError = require(`./bugreport`);
const { spinner } = require(`./spinner`);
const detect = require(`./detection`);

module.exports = {
  spinner,
  generateError,
  detect
};
