
type LogFunction = (message: string, ...optionalParams: any[]) => void;

const Logger = (function () {

  function composeTimestamp(fn: LogFunction, level: string): LogFunction {
    return (message: string, ...optionalParams: any[]) => {
      if (optionalParams && optionalParams.length > 0) {
        fn(`${level} [${new Date().toISOString()}] ${message}`, optionalParams);
        return;
      }
      fn(`${level} [${new Date().toISOString()}] ${message}`);
    };
  }

  const Logger = {

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
  return Logger;
}());

export default Logger;
