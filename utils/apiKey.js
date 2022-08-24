const shell = require(`shelljs`);
const { setConfig, config } = require(`./config`);
const getApiKey = async () => {
	const herokuApiToken = await shell
		.cat(`~/.netrc `)
		.grep(
			`[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}`
		)
		.substring(11, 47);
	setConfig({ herokuApiToken });
};

module.exports = getApiKey;
