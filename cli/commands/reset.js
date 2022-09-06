const { unlink, rm } = require(`fs/promises`);
const {
  access,
  constants,
  spinner,
  chalk,
  config,
  setConfig
} = require(`../../utils`);
const { destroyHerokuApp } = require(`../../providers/heroku`);
const { herokuQuestions } = require(`../../core`);
const { getProviders } = require(`../../core/questions`);
const prompts = require(`prompts`);

const reset = () => {
  const FILES_TO_REMOVE = [
    {
      directory: `${process.cwd()}`,
      file: `server.${config.projectType}`
    },
    {
      directory: `${process.cwd()}`,
      file: `database.${config.projectType}`
    }
  ];

  const _resetFiles = async () => {
    spinner.start(` 🦄  ${chalk.yellow(`Searching for our files...`)} `);
    for await (let file of FILES_TO_REMOVE) {
      try {
        await access(`${file.directory}/${file.file}`, constants.F_OK);
        await unlink(`${file.directory}/${file.file}`);
        spinner.stopAndPersist({
          symbol: `🧹`,
          text: ` Cleaned up ${chalk.yellow(file.file)} \n`
        });
      } catch (error) {
        if (error.code === `ENOENT`) {
          spinner.stopAndPersist({
            symbol: `🧹`,
            text: ` ${chalk.yellow(`Project looks clean `)} \n`
          });
          break;
        }
      }
    }
    await _resetProviderSpecificFiles();
    await _resetDirectories();
  };

  const _resetProviderSpecificFiles = async () => {
    try {
      await unlink(
        `${config.provider === `heroku` ? `heroku.yml` : `render.yaml`}`
      );
      spinner.stopAndPersist({
        symbol: `🧹`,
        text: ` Cleaned up ${chalk.yellow(
          `${config.provider === `heroku` ? `heroku.yml` : `render.yaml`}`
        )} \n`
      });
    } catch (error) {
      spinner.stopAndPersist({
        symbol: `🧹`,
        text: ` ${chalk.yellow(`No provider specific files to clean up`)} \n`
      });
    }
  };

  const _resetDirectories = async () => {
    spinner.start(` 🦄  ${chalk.yellow(`Searching for our directories...`)} `);
    const directory = `${process.cwd()}/config/env`;
    try {
      await access(directory, constants.F_OK);
      await rm(directory, { recursive: true });
      spinner.stopAndPersist({
        symbol: `🧹`,
        text: ` Cleand up ${chalk.yellow(`env`)} folder \n`
      });
    } catch (error) {
      if (error.code === `ENOENT`) {
        spinner.stopAndPersist({
          symbol: `🧹`,
          text: ` ${chalk.yellow(`Directories looks clean`)} \n`
        });
      }
    }
  };

  const _resetProvider = async () => {
    setConfig(
      await prompts([
        {
          type: `select`,
          name: `provider`,
          message: `What provider do you want to reset?`,
          warn: `Not enabled yet`,
          choices: getProviders()
        }
      ])
    );

    const { provider } = config;

    switch (provider) {
      case `heroku`:
        setConfig(
          await prompts([
            {
              type: `text`,
              name: `projectName`,
              message: `Project Name`,
              validate: value => (value ? true : `Project name is required`)
            }
          ])
        );
        await destroyHerokuApp(config.providers.heroku);
        await _resetFiles();
        break;
      case `render`:
        await _resetFiles();
        break;
      default:
        break;
    }
  };
};

module.exports = { name:`reset`,invoke: reset };
