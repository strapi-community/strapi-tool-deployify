const replace = require(`replace-in-file`);
const { copyFile ,access} = require(`fs/promises`);
const ora = require(`ora`);
const spinner = ora({ text: `` });
const chalk = require(`chalk`);

const pathExists = async path => {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
};

module.exports = {
  spinner,
  replace,
  chalk,
  pathExists,
  copyFile
};
