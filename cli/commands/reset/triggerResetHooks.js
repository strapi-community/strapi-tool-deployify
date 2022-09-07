const triggerResetHooks = async ({ config, providerConfig }) => {
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
