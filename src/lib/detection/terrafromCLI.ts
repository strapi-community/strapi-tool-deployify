import shell from 'shelljs';

export function terraformCLI() {
  return shell.which(`terrafrom`);
}
