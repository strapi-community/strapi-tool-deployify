const prompts = require(`prompts`);

const { setConfig, config } = require(`../utils`);
module.exports = async () => {
	const questions = await prompts([
		{
			type: `text`,
			name: `projectName`,
			message: `Project Name`,
			validate: value => (value ? true : `Project name is required`)
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
				}
			]
		},
		{
			type: `select`,
			name: `herokuRegion`,
			message: `What region do you want to deploy to? 🌍`,
			choices: [
				{
					title: `US`,
					value: `us`
				},
				{
					title: `EU`,
					value: `eu`
				}
			]
		},
		{
			name: `useDocker`,
			type: `confirm`,
			message: `Are you using Docker for deployment? 🐳`,
			initial: false
		}
	]);
	setConfig({
		...config,
		...questions,
		projectName: questions.projectName,
		env: questions.env
	});
};
