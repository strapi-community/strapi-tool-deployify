const path = require(`path`);
const { resolve } = require(`path`);
const { Liquid } = require(`liquidjs`);
const { file } = require(`../../core`);

const liquidEngine = new Liquid({
  root: resolve(__dirname, `templates`),
  extname: `.liquid`
});

const generateHerokuTemplate = ({ config, herokuConfig }) => {
  const template = liquidEngine.renderFileSync(`heroku`, {
    dockerFile: config.env === `production` ? `Dockerfile.prod` : `Dockerfile`,
    env: config.env
  });
  const filePath = path.join(config.outDir, herokuConfig.outputFileName);
  return file.generate(filePath, template);
};

module.exports = { generateHerokuTemplate };
