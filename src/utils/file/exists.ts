import { pathExists } from 'fs-extra';

export async function exists(filePath: string) {
  try {
    await pathExists(filePath);
    return true;
  } catch (error) {
    return false;
  }
}
