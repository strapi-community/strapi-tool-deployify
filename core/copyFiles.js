const {
	yarnLockToPackageLock,
	spinner,
	chalk,
	copyFile,
	config
} = require(`../utils`);

const copyHerokuFiles = async () => {
	spinner.start(` 🚀  Creating heroku.yml depoyment file`);
	await copyFile(
		`${config.providersDir}/${config.provider}.${config.provider}.yml`,
		`${config.outDir}/${config.provider}.yml`
	);
	spinner.stopAndPersist({
		symbol: `🐳`,
		text: ` Added ${chalk.bold.green(
			config.provider.toUpperCase()
		)} configuration file to project \n`
	});
	await yarnLockToPackageLock();
};

module.exports = {
	copyHerokuFiles
};
