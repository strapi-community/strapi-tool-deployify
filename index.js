#!/usr/bin/env node

/**
 * strapi-tool-strapi-tool-herokufy
 * Add docker support for a Strapi Project
 *
 * @author Simen Daehlin <https://dehlin.dev>
 */

const { cli, init, log } = require(`./cli`);
const questions = require(`./core/questions`);
const {
	detectPackageManager,
	goodbye,
	detectDownloadsAndStars,
	config
} = require(`./utils`);
const getApiKey = require(`./utils/apiKey`);
const { installDependecies, copyHerokuFiles } = require(`./core`);
const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;
(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);
	debug && log(flags);
	try {
		await detectDownloadsAndStars();
		await detectPackageManager();
		await questions();
		config.useDocker && (await copyHerokuFiles());
		await installDependecies();
		await goodbye();
	} catch (error) {
		await goodbye(false);
	}
})();
