const prompts = require(`prompts`);
const { loadProviders, loadProviderConfig } = require(`../config`);

const askGenerateQuestions = async () => {
  let initialQuestions = [
    {
      type: `text`,
      name: `projectName`,
      message: `Project Name`,
      validate: value => (value ? true : `Project name is required`)
    },
    {
      type: `select`,
      name: `provider`,
      message: `What provider do you want to use?`,
      warn: `Not enabled yet`,
      choices: getProviders()
    }
  ];

  const initialAnswers = await prompts(initialQuestions);

  let supplementaryQuestions = [
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
  ];

  const providerRegions = loadProviderConfig(initialAnswers.provider).regions;
  if (providerRegions) {
    supplementaryQuestions.unshift({
      type: `select`,
      name: `region`,
      message: `What region do you want to deploy to? 🌍`,
      choices: providerRegions
    });
  }
  const supplementaryAnswers = await prompts(supplementaryQuestions);

  return {
    ...initialAnswers,
    ...supplementaryAnswers
  };
};

const askResetQuestions = async detectedProvider => {
  let { environments } = await prompts([
    {
      type: `multiselect`,
      name: `environment`,
      message: `Pick the environments to clean`,
      choices: [
        { title: `Development`, value: `development` },
        { title: `Production`, value: `production` }
      ],
      min: 1,
      hint: `- Space to select. Return to submit`
    }
  ]);
  if (detectedProvider) {
    const { providerConfirmation } = await prompts([
      {
        type: `confirm`,
        name: `providerConfirmation`,
        initial: true,
        message: `Is ${detectedProvider} the provider you want to reset?`
      }
    ]);

    if (providerConfirmation) {
      return { environments, provider };
    }
  }

  const { provider } = await prompts([
    {
      type: `select`,
      name: `provider`,
      message: `What provider do you want to use?`,
      warn: `Not enabled yet`,
      choices: getProviders()
    }
  ]);

  return { environments, provider };
};

const getProviders = () => {
  let providerChoices = [];
  for (const providerKey in loadProviders()) {
    const provider = loadProviderConfig(providerKey);

    providerChoices.push({
      title: provider.name,
      value: providerKey,
      description: provider.description,
      disabled: !provider.enabled
    });
  }
  return providerChoices;
};

module.exports = {
  askGenerateQuestions,
  askResetQuestions
};
