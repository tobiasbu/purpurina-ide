import { ConsoleMethodNames, MessageLogType } from './types';
import HijackLoggerMiddleware from './HijackLoggerMiddleware';
import { backtrace } from './stacktrace/backtrace';

export default function takeOverConsole(middleware: HijackLoggerMiddleware) {
  const console = window.console;
  if (!console) {
    return;
  }
  function intercept(method: ConsoleMethodNames, messageType: MessageLogType) {
    const original = console[method];
    const composeConsoleFunc = function (type: MessageLogType, message: any, ...args: any[]) {

      const st = backtrace();
      // original(st);

      // middleware[method](message, args);
      middleware.onLog({
        type,
        message,
        args,
        st,
      });
      // do sneaky stuff
      if (original.apply) {
        // Do this for normal browsers
        original.apply(console, [message].concat(args)); // arguments
      } else {
        // Do this for IE
        const message = Array.prototype.slice.apply(arguments).join(' ');
        original(message);
      }
    };

    middleware.original[method] = original;
    console[method] = composeConsoleFunc.bind(window, messageType);

  }
  const methods: ConsoleMethodNames[] = ['log', 'debug', 'info', 'warn', 'error'];
  let type: MessageLogType;
  for (let i = 0; i < methods.length; i += 1) {
    const method = methods[i];
    if (method === 'log' || method === 'debug' || method === 'info') {
      type = MessageLogType.Info;
    } else if (method === 'warn') {
      type = MessageLogType.Warn;
    } else if (method === 'error') {
      type = MessageLogType.Error;
    }

    // console.log; console.info; console.debug
    // console.error;
    // console.warn;

    intercept(methods[i], type);
  }
}

