const { copyHerokuFiles } = require(`./copyFiles`);
const { installDependencies } = require(`./dependencies`);
const {
  genericQuestions,
  herokuQuestions,
  renderQuestions,
  getProviders
} = require(`./questions`);
const { generateServer, generateDatabase } = require(`./generateFiles`);
const { configSetup } = require(`./configSetup`);
const { generateDockerFile } = require(`./docker`);
module.exports = {
  copyHerokuFiles,
  generateDatabase,
  installDependencies,
  genericQuestions,
  herokuQuestions,
  renderQuestions,
  generateServer,
  configSetup,
  generateDockerFile,
  getProviders
};
