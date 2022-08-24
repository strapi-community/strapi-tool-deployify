const { copyHerokuFiles } = require(`./copyFiles`);
const installDependecies = require(`./dependencies`);
const { checkAndBackupDB, generateDatabase } = require(`./database`);
const questions = require(`./questions`);
module.exports = {
	copyHerokuFiles,
	checkAndBackupDB,
	generateDatabase,
	installDependecies,
	questions
};
