const prompts = require(`prompts`);

const { setConfig, config } = require(`../utils`);
const genericQuestions = async () => {
  const questions = await prompts([
    {
      type: `select`,
      name: `provider`,
      message: `What provider do you want to use?`,
      warn: `Not enabled yet`,
      choices: [
        {
          title: `Heroku`,
          value: `heroku`,
          description: `Heroku Platform`
        },
        {
          title: `Render`,
          value: `render`,
          description: `Render`
        },
        {
          title: `AWS`,
          value: `aws`,
          description: `Amazon Web Services`,
          disabled: true
        },
        {
          title: `Digital Ocean`,
          value: `digitalocean`,
          description: `Digital Ocean App Platform`,
          disabled: true
        },
        {
          title: `Google`,
          value: `Google`,
          description: `Google Cloud Platform`,
          disabled: true
        }
      ]
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

const herokuQuestions = async () => {
  const questions = await prompts([
    {
      type: `select`,
      name: `region`,
      message: `What region do you want to deploy to? 🌍`,
      choices: [
        {
          title: `US`,
          value: `us`
        },
        {
          title: `EU`,
          value: `eu`
        }
      ]
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
      choices: [
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
    }
  ]);
  setConfig({
    ...config,
    ...questions
  });
};

module.exports = { genericQuestions, herokuQuestions, renderQuestions };
