const shell = require(`shelljs`);
const os = require(`os`);
const path = require(`path`);
const { access } = require(`fs/promises`);
const { config } = require(`../../config`);
const { spinner } = require(`../../utils/spinner`);
const childProcess = require(`child_process`);

const getApiKey = async () => {
  try {
    const apiToken = await shell
      .cat(netRCPath)
      .grep(
        `[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}`
      )
      .substring(11, 47);
    config.providers.heroku.apiToken = apiToken;
  } catch (error) {
    spinner.stopAndPersist({
      symbol: `❌`,
      text: `Unable to get API key from Heroku. Please make sure you are logged in to Heroku.`
    });
  }
};

const isWindowsPlatform = () => {
  return os.platform() === `win32` ? true : false;
};

const herokuAuthenticate = async () => {
  if (isWindowsPlatform()) {
    childProcess.execSync(`heroku login`, {
      shell: true
    });
  } else {
    childProcess.execSync(`heroku`, [`login`], {
      stdio: `inherit`
    });
  }
};

const netRCPath = () => {
  const netRC = isWindowsPlatform() ? `_netrc` : `.netrc`;
  return path.join(os.homedir(), netRC);
};

const netrcExists = async () => {
  try {
    await access(path.join(os.homedir(), netRCPath));
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = { getApiKey, herokuAuthenticate, netRCPath, netrcExists };
