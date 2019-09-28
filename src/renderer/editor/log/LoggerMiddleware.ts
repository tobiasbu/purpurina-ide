import {
  IConsoleWidget,
  ConsoleMessagePayload,
} from './types';
import HijackLoggerMiddleware from './HijackLoggerMiddleware';

class LoggerMiddleware extends HijackLoggerMiddleware {

  public widgetConsole: IConsoleWidget;

  public onLog(payload: ConsoleMessagePayload): void {
    if (this.widgetConsole !== undefined && this.widgetConsole !== null) {
      this.widgetConsole.onLog(payload);
    }
  }

  // public log(message?: any, ...args: any[]): void {
  //   if (this.widgetConsole) {
  //     this.widgetConsole.add({
  //       message,
  //       args,
  //       type: MessageType.Log,
  //     });
  //   }
  // }

  // public error(message?: any, ...args: any[]): void {
  //   if (this.widgetConsole) {
  //     this.widgetConsole.add({
  //       message,
  //       args,
  //       type: MessageType.Error,
  //     });
  //   }
  // }

  // public warn(message?: any, ...args: any[]): void {
  //   if (this.widgetConsole) {
  //     this.widgetConsole.add({
  //       message,
  //       args,
  //       type: MessageType.Warn,
  //     });
  //   }
  // }
}

export default new LoggerMiddleware();
