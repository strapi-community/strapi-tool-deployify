const {
	spinner,
	chalk,
	shell,
	access,
	constants,
	generateError,
	config
} = require(`../utils`);

const installDependecies = async () => {
	try {
		await checkForOldDependecies(
			config.packageManager === `yarn` ? `remove` : `uninstall`
		);
		spinner.start(
			` 📦 Installing dependencies using ${chalk.bold.yellow(
				config.packageManager.toUpperCase()
			)}...`
		);
		// shell.exec(
		// 	config.packageManager,
		// 	`${config.packageManager === `yarn` ? `add` : `install`}`,
		// 	`pg`,
		// 	`pg-connection-string`
		// );
		spinner.stopAndPersist({
			symbol: `📦`,
			text: ` Installing dependencies installed with ${chalk.bold.yellow(
				config.packageManager.toUpperCase()
			)} \n`
		});
	} catch (error) {
		console.log(error);
		await generateError(error);
	}
};
const checkForOldDependecies = async command => {
	try {
		spinner.start(` 📦 Checking for old dependencies...`);
		await access(`package.json`, constants.R_OK);
		spinner.start(` 📦 Cleaning up old dependencies...`);
		const pkg = require(`${process.cwd()}/package.json`);
		console.log(pkg);
		// await execa(`${config.packageManager}`, [
		// 	`${command}`,
		// 	`pg`,
		// 	`pg-connection-string`
		// ]);

		spinner.stopAndPersist({
			symbol: `📦`,
			text: ` Cleaned up old dependencies \n`
		});
	} catch (error) {
		spinner.stopAndPersist({
			symbol: `📦`,
			text: ` No old dependencies to clean up \n`
		});
		return;
	}
};
module.exports = installDependecies;
