const { herokuHooks, destroyHerokuApp } = require(`./heroku`);
module.exports = {
  hooks: herokuHooks,
  destroyHerokuApp
};
