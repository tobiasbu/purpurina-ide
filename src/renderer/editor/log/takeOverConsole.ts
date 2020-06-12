import {
  ConsoleMethodNames,
  MessageLogType,
  ConsoleMessagePayload,
} from './types';
import HijackLoggerMiddleware from './HijackLoggerMiddleware';
import { backtrace } from './stacktrace/backtrace';

let lastGroup = null;
let counter = -1;

export default function takeOverConsole(middleware: HijackLoggerMiddleware) {
  const console = window.console;
  if (!console) {
    return;
  }
  function intercept(method: ConsoleMethodNames, messageType: MessageLogType) {
    const original = console[method];
    const composeConsoleFunc = function (
      type: MessageLogType,
      message: any,
      ...args: any[]
    ) {
      const st = backtrace();
      // original(st);

      const msg: ConsoleMessagePayload = {
        type,
        message,
        args,
        st,
        index: counter += 1,
      };

      if (method === 'group') {
        lastGroup = msg;
      } else if (method === 'groupEnd') {
        lastGroup = null;
      } else if (lastGroup !== null) {
        msg.parent = lastGroup;
      }

      // middleware[method](message, args);
      middleware.onLog(msg);
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
  const methods: ConsoleMethodNames[] = [
    'log',
    'debug',
    'info',
    'warn',
    'error',
    'group',
    'groupEnd',
  ];
  let type: MessageLogType;
  for (let i = 0; i < methods.length; i += 1) {
    const method = methods[i];
    if (method === 'log' || method === 'debug' || method === 'info') {
      type = MessageLogType.Info;
    } else if (method === 'warn') {
      type = MessageLogType.Warn;
    } else if (method === 'error') {
      type = MessageLogType.Error;
    } else if (method === 'group') {
      type = MessageLogType.Group;
    } else if (method === 'groupEnd') {
      type = MessageLogType.GroupEnd;
    }

    // console.log; console.info; console.debug
    // console.error;
    // console.warn;

    intercept(methods[i], type);
  }
}
