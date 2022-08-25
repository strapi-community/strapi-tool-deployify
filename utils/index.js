const generateError = require(`./bugreport`);
const goodbye = require(`./goodbye`);
const { setConfig, config } = require(`./config`);
const {
	spinner,
	replace,
	chalk,
	access,
	constants,
	copyFile
} = require(`./utils`);
const {
	detectPackageManager,
	detectProjectType,
	detectDownloadsAndStars,
	detectHerokuCLI
} = require(`./detection`);

module.exports = {
	spinner,
	replace,
	chalk,
	access,
	constants,
	copyFile,
	generateError,
	goodbye,
	detectPackageManager,
	detectProjectType,
	setConfig,
	config,
	detectDownloadsAndStars,
	detectHerokuCLI
};
