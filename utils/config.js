const path = require(`path`);

const _config = {
	url: `https://github.com/strapi-community/strapi-tool-herokufy`,
	dockerComposeDir: path.join(__dirname, `../templates/compose`),
	dockerfileDir: path.join(__dirname, `../templates/dockerfiles`),
	outDir: path.join(process.cwd()),
	projectType: `js`,
	packageManager: `yarn`,
	env: `development`,
	npmDownloads: 0,
	githubStars: 0,
	dockerCompose: false,
	dbtype: `postgresql`,
	dbhost: ``,
	dbname: ``,
	dbuser: ``,
	dbpassword: ``,
	dbport: null,
	quickStart: false
};
const setConfig = newConfig => Object.assign(_config, newConfig);
const config = _config;

module.exports = { setConfig, config };
