import { CommandKey, commands } from './index';
import * as logger from '../../utils/logger';
import { Command } from 'types';

export const meta = {
  name: `help`,
  escription: `Display all commands with their description`
};

export async function invoke() {
  for (const command of Object.keys(commands)) {
    const cmd = (await commands[command as CommandKey]()) as Command;
    logger.log({
      prefixText: `-`,
      text: `${cmd.meta.name} ${cmd.meta.description} '\n'`
    });
  }
}
