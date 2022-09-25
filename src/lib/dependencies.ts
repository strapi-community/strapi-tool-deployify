import shell from 'shelljs';
import { PackageManagers } from 'types';

export function install(
  packageManager: PackageManagers,
  packageNames: string[]
) {
  if (!packageNames.length) {
    return;
  }

  const installFlag = packageManager === `yarn` ? `add` : `install`;
  shell.exec(`${packageManager} ${installFlag} ${packageNames.join(` `)}`, {
    silent: true
  });
}
