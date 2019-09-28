import { ConsoleMessagePayload, ConsoleFunction } from './types';

// tslint:disable-next-line: function-name
function NOOP() {

}

export default class HijackLoggerMiddleware {

  original: {
    log: ConsoleFunction;
    error: ConsoleFunction;
    warn: ConsoleFunction;
    info: ConsoleFunction;
    debug: ConsoleFunction;
  };
  constructor() {
    this.original = {
      log: NOOP,
      error: NOOP,
      debug: NOOP,
      info: NOOP,
      warn: NOOP,
    };
  }
  public onLog?(payload: ConsoleMessagePayload): void;
}
