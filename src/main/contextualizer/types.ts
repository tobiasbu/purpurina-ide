import type { IpcMainEvent, IpcMainInvokeEvent } from 'electron';
import type IpcContext from './IpcContext';

type IpcListener = (event: IpcMainEvent, ...args: any[]) => void;
type IpcHandleListener = (
  event: IpcMainInvokeEvent,
  ...args: any[]
) => Promise<void> | any;

// interface ChannelDefinition {
//   once?: boolean;
//   handle?: boolean;
//   fn: IpcListener | IpcHandleListener;
// }

export interface ChannelApi {
  // [indexer: string]: Callback | ChannelDefinition;
  on?: {
    [indexer: string]: IpcListener;
  };
  once?: {
    [indexer: string]: IpcListener;
  };
  handle?: {
    [indexer: string]: IpcHandleListener;
  };
  handleOnce?: {
    [indexer: string]: IpcHandleListener;
  };
}

export interface HandlerConstructor<T extends IDisposable> {
  new (): T;
}

export interface ContextHandlers extends IDisposable {
  allocate<T extends IDisposable>(
    handlerName: string,
    Handler: HandlerConstructor<T> | string
  ): T;
  ipc(): IpcContext;
  window: any;
  shared?: SharedApplicationContext;
}

export interface ApplicationContext extends IDisposable {}
export type ContextCreatorResult = Callback | ApplicationContext;
export type ContextCreator = (
  contextHandlers: ContextHandlers
) => void | ContextCreatorResult;

export interface SharedApplicationContext extends ApplicationContext {
  [indexer: string]: any;
}
export type SharedContextCreatorResult = Callback | SharedApplicationContext;
export type SharedContextCreator = (
  contextHandlers: ContextHandlers
) => void | SharedContextCreatorResult;
