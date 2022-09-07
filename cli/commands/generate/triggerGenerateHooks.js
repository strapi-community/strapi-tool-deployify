const { loadProviderConfig } = require(`../../../config`);
const internalGenerateHooks = require(`./internalGenerateHooks`);

const triggerGenerateHooks = async config => {
  const providerConfig = loadProviderConfig(config.provider);
  // setup hooks
  const { hooks } = require(`${config.providersDir}/${config.provider}`);

  // init hooks
  config.hooks.addHooks({
    ...hooks,
    ...internalGenerateHooks
  });

  // trigger provider setup
  // provider specific pre build
  await config.hooks.callHook(`prebuild`, { providerConfig, config });

  // general internal pre build
  await config.hook.callHook(`internalprebuild`, { providerConfig, config });

  // provider specific build
  await config.hooks.callHook(`build`, { providerConfig, config });

  // provider specific post build
  await config.hooks.callHook(`postbuild`, { providerConfig, config });

  // general internal pre build
  await config.hook.callHook(`internalpostbuild`, { providerConfig, config });
};

module.exports = {
  triggerGenerateHooks
};
