const { herokuSetup, detectHerokuCLI } = require(`./heroku`);
const getApiKey = require(`./apiKey`);
const { useTool } = require(`./docker`);

module.exports = {
  getApiKey,
  herokuSetup,
  detectHerokuCLI,
  useTool
};
