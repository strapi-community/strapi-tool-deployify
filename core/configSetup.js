const {
  spinner,
  access,
  chalk,
  copyFile,
  generateError,
  constants,
  config
} = require(`../utils`);
const path = require(`path`);
const fse = require(`fs-extra`);
const { generateDatabase, generateServer } = require(`./generateFiles`);

const configSetup = async () => {
  for await (const file of config.files) {
    await checkForExistingFolder(file);
    await _configSetup(file);
  }
};

const _configSetup = async type => {
  if (!path) return;
  const folderPath = path.join(
    process.cwd(),
    `config`,
    `env`,
    config.env,
    `${type}.${config.projectType}`
  );

  try {
    await fse
      .outputFile(
        folderPath,
        type === `server` ? await generateServer() : await generateDatabase()
      )

      .toString();
    spinner.stopAndPersist({
      symbol: `⚙️`,
      text: `  Configured ${chalk.bold.green(
        `config/env/${config.env}/${type}.${config.projectType}`
      )} \n`
    });
  } catch (error) {
    await generateError(error);
  }
};

const checkForExistingFolder = async type => {
  const backupFileName = `${type}.backup${Math.floor(
    1000 + Math.random() * 9000
  )}`;
  const oldPath = path.join(
    process.cwd(),
    `config`,
    `env`,
    config.env,
    `${type}.${config.projectType}`
  );

  const backupPath = path.join(
    process.cwd(),
    `config`,
    `env`,
    config.env,
    backupFileName
  );

  try {
    spinner.start(
      `Checking for existing config/env/${config.env}/${type}.${config.projectType}`
    );
    await access(oldPath, constants.F_OK);
    await copyFile(oldPath, backupPath);
    spinner.stopAndPersist({
      symbol: `🕵️‍♀️`,
      text: ` Detected ${chalk.yellow(
        `config/env/${config.env}/${type}.${config.projectType}`
      )}, backing up to ${chalk.yellow(backupFileName)} \n`
    });
  } catch (error) {
    await fse
      .outputFile(
        oldPath,
        type === `server` ? await generateServer() : await generateDatabase()
      )
      .toString();
    spinner.stopAndPersist({
      symbol: `🕵️‍♀️`,
      text: ` Did not detect ${chalk.yellow(
        `config/env/${config.env}/${type}.${config.projectType}`
      )} \n`
    });
  }
};

module.exports = { configSetup };
