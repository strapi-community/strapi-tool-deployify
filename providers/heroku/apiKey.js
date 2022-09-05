const os = require(`os`);
const shell = require(`shelljs`);
const { config } = require(`../../utils/config`);
const { spinner } = require(`../../utils/config`);

const getApiKey = async () => {
  try {
    /* Checking if the user is on a windows machine and if so, it will use the backslash instead of the
  forward slash. */
    const slash = os.platform() === `win32` ? `\\` : `/`;

    const apiToken = await shell
      .cat(`${os.homedir()}${slash}.netrc `)
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

module.exports = { getApiKey };
