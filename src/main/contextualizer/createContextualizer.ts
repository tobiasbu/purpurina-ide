import {
  ContextHandlers,
  ContextCreator,
  SharedContextCreator,
  SharedApplicationContext,
} from './types';
import makeHandlers from './makeHandlers';

export default function createContextualizer() {
  interface ContextHandler {
    handlers: ContextHandlers;
    dispose?: Callback;
  }

  let sharedContext: SharedApplicationContext;
  let currentContext: ContextHandler;

  function disposeContext(context) {
    currentContext = null;
  }

  function createContext(
    contextCreator: ContextCreator | SharedContextCreator
  ) {
    const handlers = makeHandlers();
    handlers.shared = sharedContext;
    const creatorResult = contextCreator(handlers);
    let context: ContextHandler;

    if (typeof creatorResult === 'function') {
      context = {
        handlers,
        dispose: creatorResult,
      };
    } else if (typeof creatorResult === 'object') {
      context = {
        handlers,
        ...creatorResult,
      };
    }
    return context;
  }

  return {
    changeContext(contextCreator: ContextCreator) {
      if (!contextCreator || typeof contextCreator !== 'function') {
        throw new Error(
          `Contextualizer.changeContext: Could not load context. '${contextCreator}' is not an function`
        );
      }
      const context = createContext(contextCreator);
      if (currentContext !== null) {
        disposeContext(currentContext);
      }
      currentContext = context;
    },

    shareContext(sharedContextCreator: SharedContextCreator) {
      if (sharedContext) {
        throw new Error(
          `Contextualizer.shareContext: Could not initialize context. Shared context has been already set.`
        );
      }
      // sharedContext = createContext(sharedContextCreator);
    },
  };
}
