import path from 'path';
import * as file from 'utils/file';

export async function packageManager() {
  const [isYarn, isNPM] = await Promise.all([
    file.exists(path.join(process.cwd(), `yarn.lock`)),
    file.exists(path.join(process.cwd(), `package-lock.json`))
  ]);

  if (isYarn) {
    return `yarn`;
  }

  if (isNPM) {
    return `npm`;
  }

  return `unknown`;
}
