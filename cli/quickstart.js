const { setConfig } = require(`../utils`);

/**
 * It takes the flags passed to the CLI and sets them as the config for the project
 * @returns true
 */
const quickStart = async flags => {
  const { projecttype, packagemanager, env, provider } = flags;

  setConfig({
    projectType: projecttype.toLowerCase(),
    packageManager: packagemanager.toLowerCase(),
    env: env.toLowerCase(),
    quickStart: true,
    provider: provider || ``
  });
  return true;
};

module.exports = quickStart;
