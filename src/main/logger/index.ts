/* eslint-disable no-console */

type LogFunction = (message: string, ...optionalParams: any[]) => void;

// eslint-disable-next-line
const Logger = (function (): any {
  function composeTimestamp(fn: LogFunction, level: string): LogFunction {
    return (message: string, ...optionalParams: any[]): void => {
      if (optionalParams && optionalParams.length > 0) {
        fn(`${level} [${new Date().toISOString()}] ${message}`, optionalParams);
        return;
      }
      fn(`${level} [${new Date().toISOString()}] ${message}`);
    };
  }

  return {
    /**
     * Print a debug message.
     * @param {string} message The message to print.
     * @param {any[]} optionalParams Optional parameters;
     */
    log: composeTimestamp(console.log, 'DEBUG'),
    /**
     * Print warning message
     * @param {string} message The message to print.
     * @param {any[]} optionalParams Optional parameters;
     */
    warn: composeTimestamp(console.warn, 'WARNING'),
    /**
     * Print a error message.
     * @param {string} message The message to print.
     * @param {any[]} optionalParams Optional parameters;
     */
    error: composeTimestamp(console.error, 'ERROR'),
  };
}());

export default Logger;
