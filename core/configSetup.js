const {
	spinner,
	access,
	chalk,
	copyFile,
	generateError,
	config
} = require(`../utils`);
const path = require(`path`);
const fse = require(`fs-extra`);
const { generateDatabase, generateServer } = require(`./generateFiles`);

const configSetup = async () => {
	for await (const file of config.files) {
		await checkForExistingFolder(file);
		await _configSetup(file);
	}
	spinner.stopAndPersist({
		symbol: `💾`,
		text: ` Added ${chalk.bold.green()} configuration to database.${
			config.projectType
		} \n`
	});
};

const _configSetup = async type => {
	const folderPath = path.join(
		process.cwd(),
		`config`,
		`env`,
		config.env,
		`${type}.${config.projectType}`
	);

	try {
		await fse
			.outputFile(
				folderPath,
				type === `server` ? await generateServer() : await generateDatabase()
			)
			.toString();
	} catch (error) {
		await generateError(error);
	}
};

const checkForExistingFolder = async type => {
	const oldPath = path.join(
		process.cwd(),
		`config`,
		`env`,
		config.env,
		`${type}.${config.projectType}`
	);
	spinner.start(
		`Checking for existing config/env/${type}/${type}.${config.projectType}`
	);
	const backupPath = path.join(
		process.cwd(),
		`config`,
		`env`,
		config.env,
		`${type}.backup${Math.floor(1000 + Math.random() * 9000)}`
	);
	spinner.stopAndPersist({
		symbol: `🕵️‍♀️`,
		text: ` Detected config/env/${type}.${config.projectType}, made a backup at 👉 config/env/${type}/${type}.${config.projectType} \n`
	});
	try {
		await access(oldPath);
		await copyFile(oldPath, backupPath);
	} catch (error) {
		await fse
			.outputFile(
				oldPath,
				type === `server` ? await generateServer() : await generateDatabase()
			)
			.toString();
	}
};

module.exports = { configSetup };
