import shell from 'shelljs';

export function herokuCLI() {
  return shell.which(`heroku`);
}
