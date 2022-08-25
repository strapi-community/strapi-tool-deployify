const replace = require(`replace-in-file`);
const { access, copyFile } = require(`fs/promises`);
const { constants } = require(`fs`);
const ora = require(`ora`);
const spinner = ora({ text: `` });
const chalk = require(`chalk`);
module.exports = {
	spinner,
	replace,
	chalk,
	access,
	constants,
	copyFile
};
