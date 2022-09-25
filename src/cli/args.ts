import arg from 'arg';

export function getArgs() {
  return arg(
    {
      '--help': Boolean,
      '-h': `--help`
    },
    {
      permissive: true
    }
  );
}
