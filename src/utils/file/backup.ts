import { copy } from './copy';

export async function backup(filePath: string) {
  const filePathParts = filePath.split(`.`);
  const fileExtension = filePathParts.pop();

  let filePathSuffix = String(Date.now());
  if (fileExtension) {
    filePathSuffix += `.${fileExtension}`;
  }

  const backupFilePath = `${filePathParts.join(`.`)}.backup${filePathSuffix}`;

  return copy(filePath, backupFilePath);
}
