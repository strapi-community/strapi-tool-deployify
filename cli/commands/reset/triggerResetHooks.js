const { loadProviderConfig } = require(`../../../config`);

const triggerResetHooks = async config => {
  const providerConfig = loadProviderConfig(config.provider);
  // setup hooks
  const { hooks } = require(`${config.providersDir}/${providerConfig.name}`);
  // init provider hooks
  config.hooks.addHooks(hooks);
  // trigger provider specific destroy
  await config.hooks.callHook(`destroy`, { providerConfig, config });
};

module.exports = {
  triggerResetHooks
};
