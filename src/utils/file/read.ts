import { readFile } from 'fs/promises';

export async function read(filePath: string) {
  try {
    return readFile(filePath);
  } catch (error) {
    return false;
  }
}
