const { resolve, path } = require(`path`);
const { copyFile, constants, chalk } = require(`node:fs/promises`);
const { Liquid } = require(`liquidjs`);
const { config, spinner } = require(`../../utils`);
const liquidEngine = new Liquid({
	root: resolve(__dirname, `templates`),
	extname: `.liquid`
});

const renderconfig = async () => {
	try {
		const template = liquidEngine.renderFileSync(`render`, {
			name: config.projectName,
			env: config.env,
			nodeVersion: +process.version.match(/^v(\d+\.\d+)/)[1]
		});
		await copyFile(
			`${config.providersDir}/${config.provider}/templates/${config.provider}.liquid`,
			`${config.outDir}/${config.provider}.yml`
		);
		spinner.stopAndPersist({
			symbol: `🚀`,
			text: ` Added ${chalk.bold.green(
				config.provider.toUpperCase()
			)} configuration file to project \n`
		});
	} catch (error) {}
};

module.exports = { renderconfig };
