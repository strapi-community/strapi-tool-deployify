const path = require(`path`);
const crypto = require(`crypto`);

const _config = {
	url: `https://github.com/strapi-community/strapi-tool-herokufy`,
	providersDir: path.join(__dirname, `../providers`),
	provider: `heroku`,
	outDir: path.join(process.cwd()),
	env: `development`,
	npmDownloads: 0,
	githubStars: 0,
	useDocker: false,
	quickStart: false,
	herokuCLI: false,
	projectType: `js`,
	herokuApiToken: ``,
	projectName: ``,
	herokuRegion: `eu`,
	files: [`server`, `database`],
	strapiSecrets: {
		appKeys: crypto.randomBytes(64).toString(`hex`),
		apiTokenSalt: crypto.randomBytes(32).toString(`hex`),
		adminJwtSecret: crypto.randomBytes(32).toString(`hex`),
		jwtSecret: crypto.randomBytes(32).toString(`hex`)
	}
};
const setConfig = newConfig => Object.assign(_config, newConfig);
const config = _config;

module.exports = { setConfig, config };
