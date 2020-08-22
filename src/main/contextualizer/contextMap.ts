// import { ContextCreator, ContextHandlers } from './types';
// import IpcContext from './IpcContext';

// interface ContextHandler {
//   handlers: ContextHandlers;
//   dispose?: Callback;
// }

// let sharedContext: ContextHandler = null;
// let currentContext: ContextHandler = null;

// function disposeContext(context) {
//   currentContext = null;
// }

// // export function registerContext(
// //   contextName: string,
// //   contextCreator: ContextCreator
// // ) {
// //   contextMap.set(contextName, contextCreator);
// // }

// export function changeContext(contextCreator: ContextCreator) {
//   if (!contextCreator) {
//     throw new Error(
//       `Contextualizer.loadContext: Could not set 'undefined' context.`
//     );
//   }

//   const handlers = createContextHandlers();
//   const creatorResult = contextCreator(handlers);
//   let context: ContextHandler;

//   if (typeof creatorResult === 'function') {
//     context = {
//       handlers,
//       dispose: creatorResult,
//     };
//   } else if (typeof creatorResult === 'object') {
//     context = {
//       handlers,
//       ...creatorResult,
//     };
//   }

//   if (currentContext !== null) {
//     disposeContext(currentContext);
//   }

//   currentContext = context;
// }

// export function shareContext(contextCreator: ContextCreator) {
//   if (sharedContext) {
//     throw new Error(
//       `Contextualizer.shareContext: Could not initialize context. Shared context has been already set.`
//     );
//   }
// }

// // class ContextOrchestrator {
// //   private context: ApplicationContext;
// //   constructor() {
// //     this.contextMap;
// //     this.context = null;
// //   }
// //   private dispose(context: ApplicationContext) {}

// // }

// // export default new ContextOrchestrator();
