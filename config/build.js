const { loadConfig } = require(`./load`);

const buildConfig = (...options) => {
  return loadConfig(options);
};

module.exports = {
  buildConfig
};
