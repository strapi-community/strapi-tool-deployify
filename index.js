#!/usr/bin/env node

/**
 * strapi-tool-strapi-tool-herokufy
 * Add docker support for a Strapi Project
 *
 * @author Simen Daehlin <https://dehlin.dev>
 */

const { cli, init, log, message, resetHeroku, resetFiles } = require(`./cli`);
const questions = require(`./core/questions`);

const {
	detectPackageManager,
	goodbye,
	detectDownloadsAndStars,
	detectHerokuCLI,
	detectProjectType,
	config
} = require(`./utils`);
const { herokuSetup, useTool } = require(`./heroku`);
const { installDependecies, copyHerokuFiles, configSetup } = require(`./core`);

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);
	if (input.includes(`reset`)) {
		await resetHeroku();
		await resetFiles();
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
		if (config.useDocker) {
			await copyHerokuFiles();
			await useTool();
		}
		await configSetup();
		await installDependecies();
		await herokuSetup();
		await goodbye();
	} catch (error) {
		console.log(error);
		await goodbye(false);
	}
})();
