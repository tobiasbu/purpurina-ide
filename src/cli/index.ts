import yargs = require('yargs');

export async function main(argv: string[]) {
  yargs.command('version', `Print current Purpurina version`, {}, () => {});
}

function exit(exitCode: number): void {
  setTimeout(() => process.exit(exitCode), 0);
}

main(process.argv)
  .then(() => exit(0))
  .then(null, (err) => {
    console.error(err.message || err.stack || err);
    exit(1);
  });
