const generateError = require(`./bugreport`);
const goodbye = require(`./goodbye`);
const { setConfig, config } = require(`./config`);
const {
	yarnLockToPackageLock,
	checkForDataFolder,
	spinner,
	replace,
	chalk,
	execa,
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
const getApiKey = require(`./apiKey`);

module.exports = {
	yarnLockToPackageLock,
	checkForDataFolder,
	spinner,
	replace,
	chalk,
	execa,
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
	getApiKey,
	detectHerokuCLI
};
