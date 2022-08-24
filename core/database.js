const path = require(`path`);
const {
	spinner,
	access,
	copyFile,
	generateError,
	config
} = require(`../utils`);

const generateDatabase = async () => {
	return `
	const parse = require('pg-connection-string').parse;
const config = parse(process.env.DATABASE_URL);

${
	config.projectType === `ts` ? `export default` : `module.exports = `
} ({ env }) => ({
	connection: {
		client: 'postgres',
		connection: {
		 host: config.host,
      port: config.port,
      database: config.database,
      user: config.user,
      password: config.password,
      ssl: {
        rejectUnauthorized: false
      },
    },
    debug: false,
		}
	}
});
`;
};

const checkAndBackupDB = async () => {
	const databasePath = path.join(
		process.cwd(),
		`config`,
		`database.${config.projectType}`
	);
	spinner.start(`Checking for existing config/database.${config.projectType}`);
	const databaseOldPath = path.join(process.cwd(), `config`, `database.backup`);
	spinner.stopAndPersist({
		symbol: `🕵️‍♀️`,
		text: ` Detected config/database.${config.projectType}, made a backup at 👉 config/database.backup \n`
	});
	try {
		await access(databasePath);
		await copyFile(databasePath, databaseOldPath);
	} catch (error) {
		await generateError(error);
		spinner.stopAndPersist({
			symbol: `❌`,
			text: ` Unable to access config/database.${config.projectType} does it exist 🤔 - check and try again \n`
		});
	}
};

module.exports = { checkAndBackupDB, generateDatabase };
