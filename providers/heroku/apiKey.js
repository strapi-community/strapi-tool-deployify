const shell = require(`shelljs`);
const { setConfig } = require(`../../utils/config`);

const getApiKey = async () => {
	const apiToken = await shell
		.cat(`~/.netrc `)
		.grep(
			`[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}`
		)
		.substring(11, 47);
	setConfig({ apiToken });
};

module.exports = { getApiKey };
