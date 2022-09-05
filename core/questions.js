const prompts = require(`prompts`);

const { setConfig, config } = require(`../utils`);

const genericQuestions = async () => {
  const questions = await prompts([
    {
      type: `select`,
      name: `provider`,
      message: `What provider do you want to use?`,
      warn: `Not enabled yet`,
      choices: getProviders()
    },
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
      name: `useDocker`,
      type: `confirm`,
      message: `Are you using Docker for deployment? 🐳`,
      initial: false
    },
    {
      type: prev => (prev.useDocker ? `confirm` : null),
      name: `useDockerTool`,
      message: `Do you have a Docker.prod file or do you want us to create one?`,
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

const herokuQuestions = async action => {
  const questions = await prompts([
    {
      type: `select`,
      name: `region`,
      message: `What region do you want to ${action}? 🌍`,
      choices: _getRegions()
    }
  ]);
  setConfig({
    ...config,
    ...questions
  });
};

const renderQuestions = async () => {
  const questions = await prompts([
    {
      type: `select`,
      name: `region`,
      message: `What region do you want to deploy to? 🌍`,
      choices: _getRegions()
    }
  ]);
  setConfig({
    ...config,
    ...questions
  });
};

const getProviders = () => {
  let providerChoices = [];
  for (const providerKey in config.providers) {
    const provider = config.providers[providerKey];

    providerChoices.push({
      title: provider.name,
      value: providerKey,
      description: provider.description,
      disabled: !provider.enabled
    });
  }
  return providerChoices;
};

const _getRegions = () => {
  const providerConfig = config.providers[config.provider];
  return providerConfig.regions;
};

module.exports = {
  genericQuestions,
  herokuQuestions,
  renderQuestions,
  getProviders
};
