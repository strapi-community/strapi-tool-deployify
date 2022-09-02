const { copyHerokuFiles } = require(`./copyFiles`);
const installDependecies = require(`./dependencies`);
const { genericQuestions, herokuQuestions } = require(`./questions`);
const { generateServer, generateDatabase } = require(`./generateFiles`);
const { configSetup } = require(`./configSetup`);
const { useTool } = require(`./docker`);
module.exports = {
  copyHerokuFiles,
  generateDatabase,
  installDependecies,
  genericQuestions,
  herokuQuestions,
  generateServer,
  configSetup,
  useTool
};
