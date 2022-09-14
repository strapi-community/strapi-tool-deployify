const providers = {
  heroku: {
    name: `Heroku`,
    description: `Heroku Platform`,
    apiToken: ``,
    herokuCLI: false,
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
    ],
    defaultRegion: `global`,
    enabled: true
  },
  render: {
    name: `Render`,
    description: `Render Platform`,
    outputFileName: `render.yaml`,
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
    ],
    defaultRegion: `global`,
    enabled: true
  },
  aws: {
    name: `AWS`,
    description: `Amazon Web Services`,
    enabled: false
  },
  digitalocean: {
    name: `Digital Ocean`,
    description: `Digital Ocean App Platform`,
    enabled: false
  },
  google: {
    name: `Google`,
    description: `Google Cloud Platform`,
    enabled: false
  }
};

module.exports = {
  providers
};
