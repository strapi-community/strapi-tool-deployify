#!/usr/bin/env node

/**
 * strapi-tool-strapi-tool-herokufy
 * Add docker support for a Strapi Project
 *
 * @author Simen Daehlin <https://dehlin.dev>
 */

const { cli, init, log, message } = require(`./cli`);
const questions = require(`./core/questions`);
const prompts = require(`prompts`);
const {
	detectPackageManager,
	goodbye,
	detectDownloadsAndStars,
	detectHerokuCLI,
	detectProjectType,
	config,
	chalk,
	setConfig
} = require(`./utils`);
const {
	createHerokuApp,
	createHerokuEnv,
	setupHerokuPostgres,
	destroyHerokuApp
} = require(`./heroku`);
const {
	installDependecies,
	copyHerokuFiles,
	generateDatabase
} = require(`./core`);
const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;
(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);
	if (input.includes(`reset`)) {
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
		await goodbye();
		return;
	}
	debug && log(flags);
	try {
		await detectDownloadsAndStars();
		await detectPackageManager();
		await detectProjectType();
		await detectHerokuCLI();
		await message(`This tool will only create NEW project on heroku`);
		await questions();
		config.useDocker && (await copyHerokuFiles());
		await installDependecies();
		await generateDatabase();
		await createHerokuApp();
		await createHerokuEnv();
		await setupHerokuPostgres();
		await goodbye();
	} catch (error) {
		console.log(error);
		await goodbye(false);
	}
})();
