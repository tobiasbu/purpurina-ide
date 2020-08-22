import IpcContext from './IpcContext';
import type { ContextHandlers, HandlerConstructor } from './types';

interface AllocatedHandlers {
  [indexer: string]: IDisposable;
}

function makeHandlers(): ContextHandlers {
  let allocatedHandlers: AllocatedHandlers = {};

  /**
   * Allocates a context handler
   * @param handlerName Handler name
   * @param Handler Handler constructor or path
   */
  function allocate<T extends IDisposable>(
    handlerName: string,
    Handler: HandlerConstructor<T> | string
  ): T {
    if (allocatedHandlers[handlerName]) {
      return allocatedHandlers[handlerName] as T;
    }

    let handlerObject: T;
    try {
      if (typeof Handler === 'string') {
        const Constructor = require('./IpcContext.ts');
        if (typeof Constructor === 'function') {
          handlerObject = new Constructor();
        } else {
          if (typeof Constructor.default === 'function') {
            handlerObject = new Constructor();
          }
        }
      } else {
        handlerObject = new Handler();
      }
    } catch (e) {
      throw e;
    }

    allocatedHandlers[handlerName] = handlerObject;
    return handlerObject;
  }

  return {
    allocate,
    ipc: function (): IpcContext {
      return allocate('ipc', IpcContext);
    },
    dispose: function () {
      if (!allocatedHandlers) {
        return;
      }
      let keys = Object.keys(allocatedHandlers);
      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        if (Object.prototype.hasOwnProperty.call(allocatedHandlers, key)) {
          allocatedHandlers[key].dispose();
          allocatedHandlers[key] = undefined;
        }
      }
      allocatedHandlers = undefined;
    },
    window: undefined,
  };
}

export default makeHandlers;
