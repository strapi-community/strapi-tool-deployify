const { unlink, rm } = require(`fs/promises`);
const {
	access,
	constants,
	spinner,
	chalk,
	setConfig,
	config
} = require(`../utils`);
const { destroyHerokuApp } = require(`../providers/heroku`);
const prompts = require(`prompts`);

const FILES_TO_REMOVE = [
	{
		directory: `${process.cwd()}`,
		file: `server.${config.projectType}`
	},
	{
		directory: `${process.cwd()}`,
		file: `database.${config.projectType}`
	}
];

const resetFiles = async () => {
	spinner.start(` 🦄  ${chalk.yellow(`Searching for our files...`)} `);
	for await (let file of FILES_TO_REMOVE) {
		try {
			await access(`${file.directory}/${file.file}`, constants.F_OK);
			await unlink(`${file.directory}/${file.file}`);
			spinner.stopAndPersist({
				symbol: `🧹`,
				text: ` Cleaned up ${chalk.yellow(file.file)} \n`
			});
		} catch (error) {
			if (error.code === `ENOENT`) {
				spinner.stopAndPersist({
					symbol: `🧹`,
					text: ` ${chalk.yellow(`Project looks clean `)} \n`
				});
				break;
			}
		}
	}
	await resetDirectories();
};

const resetDirectories = async () => {
	spinner.start(` 🦄  ${chalk.yellow(`Searching for our directories...`)} `);
	const directory = `${process.cwd()}/config/env`;
	try {
		await access(directory, constants.F_OK);
		await rm(directory, { recursive: true });
		spinner.stopAndPersist({
			symbol: `🧹`,
			text: ` Cleand up ${chalk.yellow(`env`)} folder \n`
		});
	} catch (error) {
		if (error.code === `ENOENT`) {
			spinner.stopAndPersist({
				symbol: `🧹`,
				text: ` ${chalk.yellow(`Directories looks clean`)} \n`
			});
		}
	}
};

const resetHeroku = async () => {
	setConfig(
		await prompts([
			{
				type: `text`,
				name: `projectName`,
				message: `Project Name`,
				validate: value => (value ? true : `Project name is required`)
			}
		])
	);
	destroyHerokuApp();
};

module.exports = { resetFiles, resetHeroku };
