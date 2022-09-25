import ora, { PersistOptions } from 'ora';

// initialize logger
let spinner = ora();

export function debug(message?: string) {
  if (process.env.DEBUG) {
    spinner.info(message);
  }
}

export function error(message?: string) {
  spinner.fail(message);
}

export function info(message?: string) {
  spinner.info(message);
}

export function loading(message?: string) {
  spinner.start(message);
}

export function log(options: PersistOptions) {
  spinner.stopAndPersist(options);
}

export function succeed(message?: string) {
  spinner.succeed(message);
}

export function warn(message?: string) {
  spinner.warn(message);
}
