const strapiServerTemplate = fileExtension => {
  return `${
    fileExtension === `ts` ? `export default` : `module.exports = `
  } ({ env }) => ({
 url: env('WEBSITE_URL'),
  port: process.env.PORT,
});
`;
};

const strapiDatabaseTemplate = fileExtension => {
  return `const parse = require('pg-connection-string').parse;
const config = parse(process.env.DATABASE_URL);

${
  fileExtension === `ts` ? `export default` : `module.exports = `
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

const getTemplate = (name, fileExtension) => {
  let template;
  switch (name) {
    case `server`:
      template = strapiServerTemplate(fileExtension);
      break;
    case `database`:
      template = strapiDatabaseTemplate(fileExtension);
      break;
    default:
      template = ``;
      break;
  }

  return template;
};

module.exports = { getTemplate };
