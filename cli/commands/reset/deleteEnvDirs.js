const chalk = require(`chalk`);
const path = require(`path`);
const { file } = require(`../../../core`);
const { spinner } = require(`../../../utils`);
const outputs = require(`../../outputs`);

const deleteEnvDirs = async environments => {
  const directory = `${process.cwd()}/config/env`;

  for (const env of environments) {
    const folderPath = path.join(directory, env);
    const removedEnv = await file.remove(folderPath);

    if (removedEnv) {
      spinner.stopAndPersist({
        symbol: `🧹 `,
        text: `Cleand up ${chalk.yellow(`${folderPath}`)} folder \n`
      });
    } else {
      outputs.error(`Unable to clean ${chalk.yellow(`${folderPath}`)}`);
    }
  }
};

module.exports = {
  deleteEnvDirs
};
