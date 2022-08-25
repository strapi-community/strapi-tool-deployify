const meow = require(`meow`);
const meowHelp = require(`cli-meow-help`);

const flags = {
	clear: {
		type: `boolean`,
		default: true,
		desc: `Clear the console`
	},
	version: {
		type: `boolean`,
		alias: `v`,
		desc: `Print CLI version`
	}
};
const commands = {
	help: { desc: `Print help info` },
	reset: { desc: `Reset the project` }
};

const helpText = meowHelp({
	name: `strapi-tool-deployify`,
	flags,
	commands
});

const options = {
	inferType: true,
	description: false,
	hardRejection: false,
	flags
};

module.exports = meow(helpText, options);
