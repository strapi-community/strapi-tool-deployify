const { Liquid } = require(`liquidjs`);
const path = require(`path`);
const { resolve } = require(`path`);
const { file } = require(`../../core`);

const liquidEngine = new Liquid({
  root: resolve(__dirname, `templates`),
  extname: `.liquid`
});

const generateRenderTemplate = ({ config, renderConfig }) => {
  const template = liquidEngine.renderFileSync(`render`, {
    name: config.projectName,
    env: config.env,
    nodeVersion: +process.version.match(/^v(\d+\.\d+)/)[1],
    region: config.region,
    docker: config.useDocker
  });
  const filePath = path.join(config.outDir, renderConfig.outputFileName);
  return file.generate(filePath, template);
};

module.exports = {
  generateRenderTemplate
};
