const { herokuSetup, destroyHerokuApp } = require(`./heroku`);
const getApiKey = require(`./apiKey`);
const { createHerokuFile } = require(`./herokuFile`);
module.exports = {
  getApiKey,
  herokuSetup,
  createHerokuFile,
  destroyHerokuApp
};
