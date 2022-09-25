import shell from 'shelljs';
import { DockerGenerateOptions } from 'types';

export function generateTemplate(options: DockerGenerateOptions) {
  shell.exec(
    `npx @strapi-community/dockerize new --usecompose=false --env=${options.env} --projecttype=${options.projectType} --packageManager=${options.packageManager} --dbtype=postgres`,
    { silent: true }
  );
}
