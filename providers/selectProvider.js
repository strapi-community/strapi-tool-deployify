const { config, detectHerokuCLI } = require(`../utils`);
const { message } = require(`../cli`);
const { herokuSetup, createHerokuFile } = require(`./heroku`);
const { renderSetup } = require(`./render`);
const { herokuQuestions, installDependecies, configSetup } = require(`../core`);
const selectProvider = async () => {
  const { provider } = config;
  switch (provider) {
    case `heroku`:
      await message(`This tool will only create NEW project on heroku`);
      await detectHerokuCLI();
      await herokuQuestions();
      await configSetup();
      await installDependecies();
      await createHerokuFile();
      await herokuSetup();
      break;
    case `render`:
      await configSetup();
      await installDependecies();
      await renderSetup();
      break;
    default:
      break;
  }
};
module.exports = { selectProvider };
