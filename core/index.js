const { installDependencies } = require(`./dependencies`);
const { generateDockerFile } = require(`./docker`);
const file = require(`./file`);
const { askGenerateQuestions, askResetQuestions } = require(`./questions`);
const { getTemplate } = require(`./templates`);
module.exports = {
  installDependencies,
  generateDockerFile,
  file,
  askGenerateQuestions,
  askResetQuestions,
  getTemplate
};
