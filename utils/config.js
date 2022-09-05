const path = require(`path`);
const crypto = require(`crypto`);
const { createHooks } = require(`hookable`);

const _config = {
  url: `https://github.com/strapi-community/strapi-tool-deployify`,
  providersDir: path.join(__dirname, `../providers`),
  provider: `heroku`,
  outDir: path.join(process.cwd()),
  env: `development`,
  npmDownloads: 0,
  githubStars: 0,
  useDocker: false,
  useDockerTool: false,
  quickStart: false,
  herokuCLI: false,
  packageManager: `yarn`,
  projectType: `js`,
  projectName: ``,
  region: `eu`,
  files: [`server`, `database`],

  strapiSecrets: {
    appKeys: crypto.randomBytes(64).toString(`hex`),
    apiTokenSalt: crypto.randomBytes(32).toString(`hex`),
    adminJwtSecret: crypto.randomBytes(32).toString(`hex`),
    jwtSecret: crypto.randomBytes(32).toString(`hex`)
  },
  hooks: createHooks(),
  providers: {
    heroku: {
      name: `Heroku`,
      description: `Heroku Platform`,
      enabled: true,
      apiToken: ``,
      outputFileName: `heroku.yml`,
      regions: [
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
    render: {
      name: `Render`,
      description: `Render Platform`,
      outputFileName: `render.yaml`,
      enabled: true,
      regions: [
        {
          title: `Oregon`,
          value: `oregon`,
          description: `US`
        },
        {
          title: `Ohio`,
          value: `ohio`,
          description: `US`
        },
        {
          title: `Frankfurt`,
          value: `frankfurt`,
          description: `EU`
        },
        {
          title: `Singapore`,
          value: `singapore`,
          description: `Asia`
        }
      ]
    },
    aws: {
      name: `AWS`,
      description: `Amazon Web Services`,
      enabled: false
    },
    digitalocean: {
      name: `Digital Ocean`,
      description: `Digital Ocean App Platform`
    },
    google: {
      name: `Google`,
      description: `Google Cloud Platform`
    }
  }
};
const setConfig = newConfig => Object.assign(_config, newConfig);
const config = _config;

module.exports = { setConfig, config };
