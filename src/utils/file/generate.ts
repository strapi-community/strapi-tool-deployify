import { outputFile } from 'fs-extra';

export async function generate(filePath: string, data: unknown) {
  try {
    await outputFile(filePath, data);
    return true;
  } catch (error) {
    return false;
  }
}
