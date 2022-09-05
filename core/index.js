const { copyHerokuFiles } = require(`./copyFiles`);
const installDependecies = require(`./dependencies`);
const {
  genericQuestions,
  herokuQuestions,
  renderQuestions,
  getProviders
} = require(`./questions`);
const { generateServer, generateDatabase } = require(`./generateFiles`);
const { configSetup } = require(`./configSetup`);
const { useTool } = require(`./docker`);
module.exports = {
  copyHerokuFiles,
  generateDatabase,
  installDependecies,
  genericQuestions,
  herokuQuestions,
  renderQuestions,
  generateServer,
  configSetup,
  useTool,
  getProviders
};
