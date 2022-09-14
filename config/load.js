const { defu } = require(`defu`);
const defaultConfig = require(`./default`);
const { providers } = require(`./providers`);

const loadConfig = (...options) => {
  return defu(...options, defaultConfig);
};

const loadProviderConfig = name => {
  return providers[name.toLowerCase()];
};

const loadProviders = () => {
  return { ...providers };
};

module.exports = {
  loadConfig,
  loadProviders,
  loadProviderConfig
};
