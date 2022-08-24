const path = require(`path`);
const shell = require(`shelljs`);
const { spinner, chalk, constants, access } = require(`./utils`);
const { setConfig, config } = require(`./config`);
const fetch = require(`node-fetch`);
const child_process = require(`child_process`);
const getApiKey = require(`../heroku/apiKey`);

const detectDownloadsAndStars = async () => {
	spinner.start(` 🦄  ${chalk.yellow(`Prepping some magic`)} `);
	try {
		const npm = await fetch(
			`https://api.npmjs.org/downloads/point/last-month/@strapi-community/herokufy`
		);
		const github = await fetch(
			`https://api.github.com/repos/strapi-community/strapi-tool-herokufy`
		);

		const { downloads } = await npm.json();
		const { stargazers_count } = await github.json();
		setConfig({ npmDownloads: downloads, githubStars: stargazers_count });

		spinner.stopAndPersist({
			symbol: `🎉`,
			text: ` ${chalk.bold.yellow(`You`)}, and ${chalk.bold.green(
				config.npmDownloads || `large amount of`
			)} other people have used this tool this month\n`
		});
	} catch (error) {
		console.log(error);
	}
};
const detectProjectType = async () => {
	spinner.start(` 💻 Detecting Project type... `);
	try {
		if (config.quickStart) {
			spinner.stopAndPersist({
				symbol: `🍿`,
				text: ` ${
					config.projectType === `ts`
						? `${chalk.bold.blueBright(`TypeScript`)}`
						: `${chalk.bold.yellow(`JavaScript`)}`
				} set by cli arguments \n`
			});
			return;
		}
		await access(path.join(process.cwd(), `tsconfig.json`));
		setConfig({ projectType: `ts` });
	} catch (error) {}

	if (!config.quickStart) {
		spinner.stopAndPersist({
			symbol: `🍿`,
			text: ` ${
				config.projectType === `ts`
					? `${chalk.bold.blueBright(`TypeScript`)}`
					: `${chalk.bold.yellow(`JavaScript`)}`
			} project detected \n`
		});
	}
};

const detectPackageManager = async () => {
	spinner.start(` 💻 Detecting package manager... `);
	try {
		if (config.quickStart) {
			spinner.stopAndPersist({
				symbol: `🍿`,
				text: ` ${
					config.packageManager === `yarn`
						? `${chalk.bold.yellow(`Yarn`)}`
						: `${chalk.bold.greenBright(`NPM`)}`
				} set by cli arguments \n`
			});
			return;
		}
		await access(`yarn.lock`, constants.R_OK);
		config.packageManager = `yarn`;
	} catch (error) {
		config.packageManager = `npm`;
	}
	if (!config.quickStart) {
		spinner.stopAndPersist({
			symbol: `📦`,
			text: ` ${chalk.bold.yellow(
				config.packageManager.toUpperCase()
			)} detected \n`
		});
	}
};

const detectHerokuCLI = async () => {
	const herokuCLI = await shell.which(`heroku`);
	if (herokuCLI) {
		setConfig({ herokuCLI: true });

		spinner.stopAndPersist({
			symbol: `💻`,
			text: ` ${chalk.bold.magenta(`Heroku`)} CLI detected \n`
		});
		await getApiKey();
		if (!config.herokuApiToken) {
			child_process.execFileSync(`heroku`, [`login`], { stdio: `inherit` });
			await getApiKey();
		}
	} else {
		spinner.stopAndPersist({
			symbol: `💻`,
			text: ` ${chalk.bold.magenta(
				`Heroku`
			)} CLI not detected, installing the tool \n`
		});
		shell.exec(`npm install -g heroku`, { silent: true });
		spinner.stopAndPersist({
			symbol: `🪄`,
			text: ` Please login to ${chalk.magenta.bold(`Heroku`)} to continue 👇 \n`
		});
		child_process.execFileSync(`heroku`, [`login`], { stdio: `inherit` });
	}
};

module.exports = {
	detectPackageManager,
	detectProjectType,
	detectDownloadsAndStars,
	detectHerokuCLI
};
