const { config } = require(`../utils`);

const generateServer = async () => {
  return `${
    config.projectType === `ts` ? `export default` : `module.exports = `
  } ({ env }) => ({
 url: env('WEBSITE_URL'),
  port: process.env.PORT,
});
`;
};

const generateDatabase = async () => {
  return `const parse = require('pg-connection-string').parse;
const config = parse(process.env.DATABASE_URL);

${
  config.projectType === `ts` ? `export default` : `module.exports = `
} ({ env }) => ({
connection: {
    client: "postgres",
    connection: {
      host: config.host,
      port: config.port,
      database: config.database,
      user: config.user,
      password: config.password,
      ssl: {
        rejectUnauthorized: false,
      },
    },
    debug: false,
  },
});

`;
};

module.exports = { generateServer, generateDatabase };
