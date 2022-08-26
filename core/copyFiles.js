const { spinner, chalk, copyFile, config } = require(`../utils`);

const copyHerokuFiles = async () => {
	spinner.start(` 🚀  Creating heroku.yml depoyment file`);
	await copyFile(
		`${config.providersDir}/${config.provider}/templates/${config.provider}.yml`,
		`${config.outDir}/${config.provider}.yml`
	);
	spinner.stopAndPersist({
		symbol: `🚀`,
		text: ` Added ${chalk.bold.green(
			config.provider.toUpperCase()
		)} configuration file to project \n`
	});
};

module.exports = {
	copyHerokuFiles
};
