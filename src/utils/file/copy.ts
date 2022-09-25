import { copy as copyFile } from 'fs-extra';

export async function copy(srcFilePath: string, dstFilePath: string) {
  try {
    await copyFile(srcFilePath, dstFilePath);
    return true;
  } catch (error) {
    return false;
  }
}
