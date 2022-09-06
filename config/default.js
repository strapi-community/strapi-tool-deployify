const path = require(`path`);
const crypto = require(`crypto`);
const { createHooks } = require(`hookable`);

const defaultConfig = {
  url: `https://github.com/strapi-community/strapi-tool-deployify`,
  providersDir: path.join(__dirname, `../providers`),
  provider: `heroku`,
  outDir: path.join(process.cwd()),
  env: `development`,
  useDocker: false,
  useDockerTool: false,
  packageManager: `yarn`,
  projectType: `js`,
  projectName: ``,
  files: [`server`, `database`],
  strapiSecrets: {
    appKeys: crypto.randomBytes(64).toString(`hex`),
    apiTokenSalt: crypto.randomBytes(32).toString(`hex`),
    adminJwtSecret: crypto.randomBytes(32).toString(`hex`),
    jwtSecret: crypto.randomBytes(32).toString(`hex`)
  },
  hooks: createHooks()
};

module.exports = defaultConfig;
