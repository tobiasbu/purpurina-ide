
import * as chalk from 'chalk';

type LogFunction = (message: string, ...optionalParams: any[]) => void;

/**
 * Logger level
 * 
 * - false - disable
 * - 'error' - errors only
 * - 'warn' - warnings and errors
 * - 'info' - errors, warnings and info messages
 * - 'log' - errors, warnings, info messages, log messages
 * - 'verbose' - everything
 */
type LogLevel = 
'error' |
'warn' |
'info' |
'log' |
'verbose';

interface LoggerOptions {
  symbol?: string;
  errorSymbol?: string;
  /**
   * Logger name
   */
  name?: string;
  /**
   * Show time stamp?
   */
  timestamp?: boolean;
  /**
   * Logger level
   */
  level?: LogLevel | false;
  /**
   * Should display log level?
   */
  displayLevel?: boolean;
  /**
   * Colorize the console message too?
   */
  colorize?: boolean;
  /**
   * Should the prefixed text show with background color?
   */
  bgPrefix?: boolean;
}

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'cyanBright',
  log: 'blue',
  verbose: 'magenta',
};

const noop = () => {};

type Logger = {
  [indexer in LogLevel]: LogFunction;
} & {
  options: LoggerOptions;
}

function capitalize(s: string) {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function getLogger(options: LoggerOptions): Logger {
  const opts: LoggerOptions  = {
    symbol: options.symbol || '',
    errorSymbol: options.errorSymbol || '',
    name: options.name || '',
    timestamp: options.timestamp || false,
    level: options.level || 'log',
    displayLevel: options.displayLevel || false,
    colorize: options.colorize || true,
    bgPrefix: options.bgPrefix || true,
  }

  enum EnumeratedLogLevel {
    false = 0,
    error,
    warn,
    info,
    log,
    verbose,
  }

  // validate user level
  let userLevel: number;
  if (typeof opts.level === 'string' && EnumeratedLogLevel[opts.level] !== undefined) {
    userLevel = EnumeratedLogLevel[opts.level];
  }
  if (typeof userLevel !== 'number') {
    userLevel = EnumeratedLogLevel.log;
  } else if (userLevel <= 0) {
    userLevel = EnumeratedLogLevel.false;
  } else if (userLevel > EnumeratedLogLevel.verbose) {
    userLevel = EnumeratedLogLevel.verbose;
  }

  const methods:LogLevel[] = [
    'error',
    'warn',
    'info',
    'log',
    'verbose'
  ];

  const logger = {
    options: opts,
    template: `${opts.displayLevel === true ? ' {{ level }}' : ''}${opts.timestamp === true ? ' [{{ time }}]' : ''}`,
    prefix: `${opts.symbol} ${opts.name}`,
    prefixError: `${opts.errorSymbol} ${opts.name}`,
  };

  function interpolate(level) {
    return logger.template.replace(/{{([^{}]*)}}/g, (substr, match) => {
      if (/level/.test(match)) {
        return level;
      } else if (/time/.test(match)) {
        return new Date().toTimeString().split(' ')[0];
      }
      return substr;
    });
  }

  function compose(fn: LogFunction, color: string, prefix: string) {
    return (message: string, ...optionalParams: any[]) => {
      let prefixColorFn = chalk[color];
      if (logger.options.bgPrefix) {
        prefixColorFn = chalk[`bg${capitalize(color)}`].black;
      } 
      const prefixMsg = prefixColorFn(`${prefix}${interpolate(logger.template)}:`)

      const msg = (logger.options.colorize) ? chalk[color](message) : message;
      if (optionalParams && optionalParams.length > 0) {
        const joinedParams = optionalParams.join(' ');
        fn(`${prefixMsg} ${msg}`, (logger.options.colorize) ? chalk[color](joinedParams) : joinedParams);
        return;
      }
      fn(`${prefixMsg} ${msg}`);
    }
  }


  methods.forEach(methodName => {
    const methodLevel = EnumeratedLogLevel[methodName];

    let method;
    if (methodLevel > userLevel) {
      method = noop;
    } else {

      if (console[methodName]) {
        let prefix;
        if (methodName === "warn" ||  methodName === "error") {
          prefix = logger.prefixError;
        } else {
          prefix = logger.prefix;
        }
        method = compose(console[methodName], colors[methodName], prefix);
      } else {
        method = noop;
      }
    }
    logger[methodName] = method;
  });
  
  return logger as any;
}