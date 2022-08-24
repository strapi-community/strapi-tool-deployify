const prompts = require(`prompts`);

const { setConfig, config, chalk } = require(`../utils`);
module.exports = async () => {
	const questions = await prompts([
		{
			type: `text`,
			name: `projectName`,
			message: `Project Name`,
			description: `What do you want to name your Heroku project. Example ${chalk.yellow(
				`my-project`
			)} will be my-project.herokuapp.com`,
			initial: `awesomestrapi`
		},
		{
			type: `select`,
			name: `env`,
			message: `What enviroments do you want to configure?`,
			choices: [
				{
					title: `Development`,
					value: `development`,
					description: `Creates a development environment`
				},
				{
					title: `Production`,
					value: `production`,
					description: `Creates a production environment`
				},
				{
					title: `Both`,
					value: `both`,
					description: `Creates development and production enviroments`
				}
			]
		},
		{
			name: `useDocker`,
			message: `Are you using Docker for deployment? 🐳`,
			active: `Yes`,
			inactive: `No`,
			type: `toggle`
		}
	]);
	setConfig({
		...config,
		projectName: questions.projectName.toLowerCase(),
		env: questions.env.toLowerCase()
	});
};
