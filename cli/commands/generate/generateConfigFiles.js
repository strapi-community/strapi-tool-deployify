const chalk = require(`chalk`);
const { pathExists } = require(`fs-extra`);
const path = require(`path`);
const { spinner } = require(`../../../utils`);
const { file, getTemplate } = require(`../../../core`);
const { outputs } = require(`../../outputs`);

const generateConfigFiles = async config => {
  const fileExtension = config.projectType;
  const environment = config.env;
  const dirPath = path.join(process.cwd(), `config`, `env`, config.env);

  for (const fileName of config.files) {
    const projectFilePath = `config/env/${environment}/${fileName}.${fileExtension}`;
    const filePath = path.join(dirPath, `${fileName}.${fileExtension}`);

    spinner.start(`Checking for existing ${projectFilePath}`);
    const hasExistingConfigFile = await pathExists(filePath);
    if (hasExistingConfigFile) {
      spinner.stopAndPersist({
        symbol: `🕵️‍♀️ `,
        text: `Detected ${chalk.yellow(`${projectFilePath}`)} \n`
      });

      const backedUp = await file.backup(filePath);
      spinner.stopAndPersist({
        text: `${chalk.yellow(projectFilePath)} was backed up ${
          backedUp ? `successfully` : `unsuccessfuly`
        } \n`
      });
    }

    const generatedFile = await file.generate(
      filePath,
      getTemplate(fileName, fileExtension)
    );
    if (generatedFile) {
      spinner.stopAndPersist({
        symbol: `⚙️ `,
        text: `Configured ${chalk.bold.green(`${projectFilePath}`)} \n`
      });
    } else {
      outputs.error(`Unable to generate the ${fileName} configuration file`);
    }
  }
};

module.exports = {
  generateConfigFiles
};
