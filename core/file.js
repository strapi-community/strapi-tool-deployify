const {
  copy: copyFile,
  remove: removeFile,
  outputFile
} = require(`fs-extra`);
const { readFile } = require(`fs/promises`);

const generate = async (filePath, data) => {
  try {
    await outputFile(filePath, data);
    return true;
  } catch (error) {
    return false;
  }
};

const remove = async filePath => {
  try {
    await removeFile(filePath);
    return true;
  } catch (error) {
    return false;
  }
};

const copy = async (srcFilePath, dstFilePath) => {
  try {
    await copyFile(srcFilePath, dstFilePath);
    return true;
  } catch (error) {
    return false;
  }
};

const read = async filePath => {
  try {
    return readFile(filePath);
  } catch (error) {
    return false;
  }
};

const backup = async filePath => {
  const filePathParts = filePath.split(`.`);
  const fileExtension = filePathParts.pop();
  const filePathSuffix = fileExtension
    ? `${Date.now()}.${fileExtension}`
    : `${Date.now()}`;

  const backupFilePath = `${filePathParts.join(`.`)}.backup${filePathSuffix}`;

  return copy(filePath, backupFilePath);
};

module.exports = {
  generate,
  remove,
  copy,
  read,
  backup
};
