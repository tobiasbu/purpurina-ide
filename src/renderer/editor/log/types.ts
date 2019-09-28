
export enum MessageLogType {
  Info = 1,
  Warn,
  Error,
}

export type ConsoleMessagePayload = {
  type: MessageLogType;
  message: any;
  args?: any[];
  st?: any;
};

export interface IConsoleWidget {
  onLog(payload: ConsoleMessagePayload): void;
}

export type ConsoleMethodNames = 'log' | 'warn' | 'error' | 'info' | 'debug';
export type ConsoleFunction =  (message?: any, ...args: any[]) => void;
