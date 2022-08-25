const { copyHerokuFiles } = require(`./copyFiles`);
const installDependecies = require(`./dependencies`);
const questions = require(`./questions`);
const { generateServer, generateDatabase } = require(`./generateFiles`);
const { configSetup } = require(`./configSetup`);
module.exports = {
	copyHerokuFiles,
	generateDatabase,
	installDependecies,
	questions,
	generateServer,
	configSetup
};
