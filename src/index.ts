#!/usr/bin/env node

import { main } from './cli';

main()
  .then(() => process.exit(0))
  .catch((err: Error) => {
    console.error(err);
    process.exit(1);
  });
