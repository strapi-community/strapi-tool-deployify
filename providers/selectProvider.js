const { config } = require(`../utils`);
const { detectHerokuCLI, herokuSetup } = require(`./heroku`);
const selectProvider = async () => {
  const { provider } = config;
  switch (provider) {
    case `heroku`:
      await detectHerokuCLI();
      await herokuSetup();
      break;
    case `render`:
      break;

    default:
      break;
  }
};
module.exports = { selectProvider };
