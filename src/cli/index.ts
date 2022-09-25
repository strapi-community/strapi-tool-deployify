import { CommandKey, commands } from './commands';
import { getArgs } from './args';
import * as logger from '../utils/logger';
import { Command } from 'types';

export async function main() {
  const args = getArgs();
  logger.debug(`CLI Args: ${JSON.stringify(args)}`);

  let command = args._[0];
  logger.debug(`Command: ${command}`);

  // default to generate
  if (!command) {
    command = `generate`;
  }

  const cmd = (await commands[command as CommandKey]()) as Command;
  if (!cmd) {
    throw new Error(`Invalid command ${command}`);
  }

  await cmd.invoke();
}
