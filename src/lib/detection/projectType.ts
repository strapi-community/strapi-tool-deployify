import path from 'path';
import * as file from 'utils/file';

export async function projectType() {
  const isTS = await file.exists(path.join(process.cwd(), `tsconfig.json`));

  if (isTS) {
    return `ts`;
  }

  return `js`;
}
