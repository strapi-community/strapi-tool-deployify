export const commands = {
  generate: () => import(`./generate`),
  reset: () => import(`./reset`),
  help: () => import(`./help`),
  version: () => import(`./version`)
};

export type CommandKey = keyof typeof commands;
