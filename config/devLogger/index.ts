/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
import chalk, { Chalk } from 'chalk';

export type LogFunction = (message: any, ...optionalParams: any[]) => void;
export type PrefixLogFunction = (prefix: string, message: any, ...optionalParams: any[]) => void;

/**
 * Logger level
 *
 * - false or 'silent' - disable
 * - 'error' - errors only
 * - 'warn' - warnings and errors
 * - 'info' - errors, warnings and info messages
 * - 'log' and 'debug' - errors, warnings, info messages, log messages
 * - 'verbose' and 'trace' - everything
 *
 * @default 'log'
 */
export type LogLevel =
  'silent' |
  'error' |
  'warn' |
  'info' |
  'log' |
  'verbose' |
  'trace';

export interface DevLoggerOptions {
  /**
   * Logger name
   */
  name?: string;
  /**
   * Logger symbol
   */
  symbol?: string;
  /**
   * Logger error symbol
   */
  errorSymbol?: string;
  /**
   * Show timestamp
   */
  timestamp?: boolean;
  /**
   * Logger level
   */
  level?: LogLevel | false;
  /**
   * Display log level
   */
  displayLevel?: boolean;
  /**
   * Colorize the console message
   */
  colorize?: boolean;
  /**
   * Should the prefixed text show with background color?
   */
  bgPrefix?: boolean;
}

// export enum Color {
//   black,
//   red,
//   green,
//   yellow,
//   blue,
//   magenta,
//   cyan,
//   white,
//   gray,
//   grey,
//   blackBright,
//   redBright,
//   greenBright,
//   yellowBright,
//   blueBright,
//   magentaBright,
//   cyanBright,
//   whiteBright,
// }

// export enum BackgroundColor {
//   bgBlack,
//   bgRed,
//   bgGreen,
//   bgYellow,
//   bgBlue,
//   bgMagenta,
//   bgCyan,
//   bgWhite,
//   bgBlackBright,
//   bgRedBright,
//   bgGreenBright,
//   bgYellowBright,
//   bgBlueBright,
//   bgMagentaBright,
//   bgCyanBright,
//   bgWhiteBright,
// }

export type Logger = {
  /**
   * Alias from `Logger.trace`.
   */
  verbose: LogFunction;
  /**
   * Prints `stderr`.
   */
  trace: LogFunction;
  /**
   * Alias for `Logger.error`.
   */
  warn: LogFunction;
  /**
   * Prints `stderr`.
   */
  error: LogFunction;
  /**
   * Alias from `Logger.log`.
   */
  info: LogFunction;
  /**
   * Prints `stdout`
   */
  log: LogFunction;
  /**
   * Alias for `Logger.log`.
   */
  debug: LogFunction,
}

export type DevLogger = Logger & {
  /**
   * Defined logger options
   */
  readonly options: DevLoggerOptions;
  /**
   * Available log levels.
   */
  readonly levels: LogLevel;
};

export const defaultColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  log: 'blue',
  verbose: 'magenta',
};

enum EnumeratedLogLevel {
  verbose = 0,
  log,
  info,
  warn,
  error,
  silent,
}

const logLevelUtil = {
  toString(level: number) {
    switch (level) {
      case 0: return 'verbose';
      case 1: return 'log';
      case 2: return 'info';
      case 3: return 'warn';
      case 4: return 'error';
      default:
        if (level >= 5) {
          return 'silent';
        }
        return 'verbose';
    }
  },
  toNumber(level: LogLevel): EnumeratedLogLevel {
    let userLevel: number;
    if (typeof level === 'string' && EnumeratedLogLevel[level] !== undefined) {
      userLevel = EnumeratedLogLevel[level];
    }
    if (typeof userLevel !== 'number') {
      userLevel = EnumeratedLogLevel.log;
    } else if (userLevel <= 0) {
      userLevel = EnumeratedLogLevel.verbose;
    } else if (userLevel >= EnumeratedLogLevel.silent) {
      userLevel = EnumeratedLogLevel.silent;
    }
    return userLevel;
  }
};

const noop = () => { };

export function capitalize(s: string): string {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function objectGet(obj: any, key: string, defaultValue = undefined) {
  const type = typeof (obj);

  if (!obj || type === 'number' || type === 'string') {
    return defaultValue;
  }

  // eslint-disable-next-line no-prototype-builtins
  if (obj.hasOwnProperty(key) && obj[key] !== undefined) {
    return obj[key];
  }
  return defaultValue;
}

interface ComposeDescriptor {
  level: LogLevel;
  std: 'stderr' | 'stdout';
  readonly chalk: Chalk,
  readonly msg: symbol;
  readonly args: symbol;
}
type ComposeLog = (message?: any, params?: any[], desc?: ComposeDescriptor) => any;

/**
 * Create logger with custom message composition.
 * @param compose The composer function
 * @param level Level which this logger should output messages.
 */
export function makeLogger(compose: ComposeLog, level?: LogLevel): Logger {
  const methods: LogLevel[] = [
    'error',
    'warn',
    'info',
    'log',
    'verbose',
  ];
  // validate user level
  const userLevel = logLevelUtil.toNumber(level);
  const u: ComposeDescriptor = {
    chalk,
    level: 'log',
    std: 'stdout',
    msg: Symbol('message'),
    args: Symbol('args'),
  }

  function createMethod(fn: LogFunction, methodLevel: LogLevel) {
    return (message: any, ...args: any[]) => {
      u.level = methodLevel;
      u.std = (methodLevel === 'error' || methodLevel === 'warn' || methodLevel === 'verbose') ? 'stderr' : 'stdout';
      const out = compose(message, args, u);
      if (typeof (out) === 'object') {
        const message = out[u.msg];
        const args = out[u.args];
        if (message && args) {
          return fn(message, args);
        }
        if (message && !args) {
          return fn(message);
        }
        if (!message && args) {
          return fn(args);
        }
        return fn(out);
      }
      return fn(out);
    }
  }

  methods.forEach((methodName) => {
    const methodLevel = EnumeratedLogLevel[methodName];
    let method: LogFunction = noop;
    if (methodLevel < userLevel) {
      method = noop;
    } else if (console[methodName]) {
      method = createMethod(console[methodName], methodName);
    } else if (methodName === 'verbose') {
      method = createMethod(console.error, 'verbose');
    }
    devLogger[methodName] = method;
  });

  devLogger['trace'] = devLogger['verbose'];
  devLogger['debug'] = devLogger['log'];
  return devLogger as any;
}

/**
 * Another generic logger based in many loggers
 * @author Tobias Ulrich <tobiasbulrich@gmail.com>
 * @param {DevLoggerOptions} options
 */
export default function devLogger(options: DevLoggerOptions): DevLogger {
  const opts: DevLoggerOptions = {
    symbol: options.symbol || '',
    errorSymbol: options.errorSymbol || '',
    name: options.name || '',
    timestamp: objectGet(options, 'timestamp', false),
    level: options.level || 'log',
    displayLevel: objectGet(options, 'displayLevel', false),
    colorize: objectGet(options, 'colorize', true),
    bgPrefix: objectGet(options, 'bgPrefix', true),
  };

  // validate user level
  let userLevel: number;
  if (typeof opts.level === 'string' && EnumeratedLogLevel[opts.level] !== undefined) {
    userLevel = EnumeratedLogLevel[opts.level];
  }
  if (typeof userLevel !== 'number') {
    userLevel = EnumeratedLogLevel.log;
  } else if (userLevel <= 0) {
    userLevel = EnumeratedLogLevel.verbose;
  } else if (userLevel > EnumeratedLogLevel.silent) {
    userLevel = EnumeratedLogLevel.silent;
  }

  /**
   * @type {LogLevel[]}
   */
  const methods: LogLevel[] = [
    'error',
    'warn',
    'info',
    'log',
    'verbose',
  ];

  const template = `${opts.displayLevel === true ? ' {{ level }}' : ''}${opts.timestamp === true ? ' [{{ time }}]' : ''}`;

  function interpolate(level: string) {
    return template.replace(/{{([^{}]*)}}/g, (substr, match) => {
      if (/level/.test(match)) {
        return level;
      }
      if (/time/.test(match)) {
        return new Date().toTimeString().split(' ')[0];
      }
      return substr;
    });
  }

  function compose(fn: LogFunction, color: string, prefix: string): LogFunction {
    let prefixColorFn = chalk[color];
    if (opts.bgPrefix) {
      prefixColorFn = chalk[`bg${capitalize(color)}`].black;
    }

    return (message: any, ...optionalParams: any[]) => {
      const prefixMsg = prefixColorFn(`${prefix}${interpolate(template)}:`);
      const msg = (opts.colorize) ? chalk[color](message) : message;

      if (optionalParams && optionalParams.length > 0) {
        const joinedParams = optionalParams.join(' ');
        fn(`${prefixMsg} ${msg}`, joinedParams); //(opts.colorize) ? chalk[color](joinedParams) : joinedParams);
        return;
      }
      fn(`${prefixMsg} ${msg}`);
    };
  }

  const devLogger = {
    options: opts,
    levels: logLevelUtil.toString(userLevel),
    // createProcessLogger: function (processName: string, color: Color, symbol?: string) {
    //   if (typeof (processName) === 'string') {
    //     if (this[processName] === undefined || this[processName] === null) {
    //       const logger = {}
    //       symbol = (typeof(symbol) === 'string') ? `${symbol} ` : '';
    //       const prefix = `${symbol}${processName} - - - - - - - - -\n`;

    //       methods.forEach((methodName) => {
    //         const methodLevel = EnumeratedLogLevel[methodName];
    //         let method: LogFunction = noop;
    //         if (methodLevel < userLevel) {
    //           method = noop;
    //         } else if (console[methodName]) {
    //           // let prefix: string;
    //           // if (methodName === 'warn' || methodName === 'error') {
    //           //   prefix = logger.prefixError;
    //           // } else {
    //           //   prefix = logger.prefix;
    //           // }
    //           method = compose(console[methodName], Color[color], prefix);
    //           // methodWithPrefix = composeWithPrefix(console[methodName], colors[methodName], prefix);
    //         }
    //         logger[methodName] = method;
    //       });
    //       logger['trace'] = logger['verbose'];
    //       logger['debug'] = logger['log'];
    //       this[processName] = logger;
    //       return true;
    //     }
    //   }
    //   throw new Error(`devLogger: Could not create sub logger named ${processName}.`);
    // }
  };

  const symbol = (typeof (opts.symbol) === 'string') ? `${opts.symbol} ` : '';
  const errorSymbol = (typeof (opts.errorSymbol) === 'string') ? `${opts.errorSymbol} ` : '';

  const mainPrefix = `${symbol}${opts.name}`;
  const mainPrefixError = `${errorSymbol}${opts.name}`;

  methods.forEach((methodName) => {
    const methodLevel = EnumeratedLogLevel[methodName];
    let method: LogFunction = noop;
    if (methodLevel < userLevel) {
      method = noop;
    } else if (console[methodName]) {
      let currentPrefix: string;
      if (methodName === 'warn' || methodName === 'error') {
        currentPrefix = mainPrefixError;
      } else {
        currentPrefix = mainPrefix;
      }
      method = compose(console[methodName], defaultColors[methodName], currentPrefix);
    }
    devLogger[methodName] = method;
  });

  devLogger['trace'] = devLogger['verbose'];
  devLogger['debug'] = devLogger['log'];
  return devLogger as any;
}
