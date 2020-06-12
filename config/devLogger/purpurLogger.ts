import { makeLogger, capitalize } from '.';
import chalk from 'chalk';

// const loggerCommon = {
//   name: 'purpur',
//   timestamp: true,
//   symbol: ' \u2615',
//   errorSymbol: ' \u2620'
// }

interface purpurOptions {
  /**
   * 'Renderer' | 'Main' | 'Electron' | 'Purpurina'
   */
  name: string;
  symbol: string;
  errorSymbol: string;
  color: string;
}

const separator = '\u2550'.repeat(2);

export default function purpurLogger(opts: purpurOptions) {
  let name = `${opts.name.toUpperCase()}`;
  const prefixColorFn = chalk[opts.color];

  return makeLogger((message, args, desc) => {
    let sys: string;
    let textColor = 'white';
    if (desc.std === 'stdout') {
      sys = opts.symbol;
    } else {
      sys = opts.errorSymbol;
      textColor = 'red';
      if (desc.level === 'warn') {
        textColor = 'yellow';
      }
    }

    let msg = prefixColorFn(` ${sys} ${name}:`);
    msg = `${msg} ${chalk[textColor](`${message}`)}`;
    if (args && args.length > 0) {
      const joinedParams = args.join(' ');
      return {
        [desc.msg]: msg,
        [desc.args]: chalk[`${textColor}Bright`](`${joinedParams}`),
      };
    }
    return `${msg}`;
  });
}
