const os = require(`os`);
const shell = require(`shelljs`);
const { setConfig } = require(`../../utils/config`);
const { spinner } = require(`../../utils/config`);

const getApiKey = async () => {
  try {
    const apiToken = await shell
      .cat(`${os.homedir()}/.netrc `)
      .grep(
        `[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}`
      )
      .substring(11, 47);
    setConfig({ providers: { heroku: { apiToken } } });
  } catch (error) {
    spinner.stopAndPersist({
      symbol: `❌`,
      text: `Unable to get API key from Heroku. Please make sure you are logged in to Heroku.`
    });
  }
};

module.exports = { getApiKey };
