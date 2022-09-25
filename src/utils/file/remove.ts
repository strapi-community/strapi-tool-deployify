import { remove as removeFile } from 'fs-extra';

export async function remove(filePath: string) {
  try {
    await removeFile(filePath);
    return true;
  } catch (error) {
    return false;
  }
}
