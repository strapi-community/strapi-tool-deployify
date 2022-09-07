const { generateDockerFile, installDependencies } = require(`../../../core`);
const { generateConfigFiles } = require(`./generateConfigFiles`);

module.exports = {
  async internalprebuild({ config }) {
    await generateConfigFiles(config);
    await installDependencies(config.packageManager);
  },

  async internalpostbuild({ config }) {
    if (config.useDocker) {
      await generateDockerFile(config);
    }
  }
};
