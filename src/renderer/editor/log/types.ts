export enum MessageLogType {
  Info = 1,
  Warn,
  Error,
  Group,
  GroupEnd,
}

export type ConsoleMessagePayload = {
  type: MessageLogType;
  message: any;
  index: number;
  args?: any[];
  st?: any;
  parent?: ConsoleMessagePayload;
};

export interface IConsoleWidget {
  onLog(payload: ConsoleMessagePayload): void;
}

export type ConsoleMethodNames =
  | 'log'
  | 'warn'
  | 'error'
  | 'info'
  | 'debug'
  | 'group'
  | 'groupEnd';
export type ConsoleFunction = (message?: any, ...args: any[]) => void;
