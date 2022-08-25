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
		spinner.stopAndPersist({
			symbol: `⚙️`,
			text: `  Added configuration to ${chalk.bold.green(
				`${file}.${config.projectType}`
			)} \n`
		});
	}
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
	const backupFileName = `${type}.backup${Math.floor(
		1000 + Math.random() * 9000
	)}`;
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
		backupFileName
	);
	spinner.stopAndPersist({
		symbol: `🕵️‍♀️`,
		text: ` Detected ${chalk.yellow(
			`config/env/${type}/${type}.${config.projectType}`
		)}, backing up to ${chalk.yellow(backupFileName)} \n`
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
