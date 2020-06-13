import DataMap from './DataMap';
import isPlainObject from './isPlainObject';
import isFunction from './isFunction';
import {
  Action,
  Store,
  IListenerMap,
  Listener,
  RemoveListener,
} from '../types';

// tslint:disable-next-line: variable-name
const ListenerMap = (function () {
  function listenerMap() {}
  if (Object.create) {
    listenerMap.prototype = Object.create(null);
  }
  return listenerMap as unknown;
})() as IListenerMap;

export default function createStore<S>(initialState: S): Store<S> {
  // if (typeof globalReducer !== 'function') {
  //   throw new Error('Maestro: Expected the reducer to be a function.');
  // }

  // const reducer = globalReducer;
  const listeners: Listener[] = [];
  const substateListeners = new ListenerMap();
  // let nextListeners: Listener[] = listeners;
  let isDispatching = false;
  let state = initialState;
  // const subStateMap = new DataMap<string | number, SubState<any, any>>();

  function getState(): Readonly<S> {
    return state;
  }

  // function getSubState<SS>(
  //   name: string | number): Readonly<SS> {
  //   const s = subStateMap.get(name).state;
  //   return s as SS;
  // }

  // function createSubState<SS, SA>(
  //   name: string | number, reducer: Reducer<SS, SA>, initialState?: SS,
  // ): SubState<SS, SA> | false {
  //   if (this.subStateMap.has(name)) {
  //     console.error(`Maestro: Could not create sub state
  //     There is already a sub state named '${name.toString()}'`);
  //     return false;
  //   }
  //   const holder: SubState<SS, SA> = {
  //     reducer,
  //     state: initialState,
  //     listeners: undefined,
  //   };
  //   subStateMap.set(name, holder);
  //   return holder;
  // }

  function addListener(listener: Listener): RemoveListener;
  function addListener(
    substate: string | number,
    listener: Listener
  ): RemoveListener;
  function addListener(
    substate: string | number | Listener,
    listener?: Listener
  ): RemoveListener {
    const firstType = typeof substate;
    if (arguments.length > 1) {
      if (firstType !== 'string' && firstType !== 'number') {
        throw new TypeError(`Maestro.addListener: Could not add listener to substate.
       Argument 'substate' is not string or number.`);
      }

      if (typeof listener !== 'function') {
        throw new TypeError(`Maestro.addListener: Could not add listener to substate named '${substate}'.
        The listener argument must be a function`);
      }
      const s = null; // subStateMap.get(name);

      if (s === undefined || s === null) {
        throw new TypeError(`Maestro.addListener: Could not add listener.
        The substate named '${substate}' does not exist`);
      }

      const subscribed = substateListeners[name];

      if (!subscribed) {
        substateListeners[name] = listener;
      } else if (isFunction(subscribed)) {
        substateListeners[name] = [subscribed as Listener, listener];
      } else {
        subscribed.push(listener);
      }
      return null;
    }

    if (isDispatching) {
      throw new Error(
        "Maestro.addListener: Can't add listener while action is executing."
      );
    }

    let isListening = true;

    if (firstType === 'function') {
      listeners.push(substate as Listener);

      return function removeListener() {
        if (!isListening) {
          return;
        }

        isListening = false;
        const index = listeners.indexOf(substate as Listener);
        listeners.splice(index, 1);
      };
    }
    throw new TypeError(`Maestro.addListener: Could not add global listener.
      The 'listener' must be a function.`);
  }

  /**
   * Dispatch an action.
   * @param {Action<S>} action The action callback
   * @param {any[]} args Additional arguments for the action
   */
  function dispatch(action: Action<S>, ...args: any[]): Readonly<S>;
  function dispatch(action: Action<S>): Readonly<S> {
    if (!isFunction(action)) {
      throw new Error(
        `Maestro: Could not dispatch action.
         The 'action' parameter is not a function.`
      );
    }

    if (isDispatching) {
      throw new Error(
        'Maestro: Could not dispatch action.\nAn action was already dispatched.'
      );
    }

    try {
      isDispatching = true;
      const argsLen = arguments.length;
      if (argsLen > 1) {
        switch (argsLen) {
          default:
            break;
          case 2:
            state = action(state, arguments[1]);
            break;
          case 3:
            state = action(state, arguments[1], arguments[2]);
            break;
        }
      } else {
        state = action(state);
      }
    } finally {
      isDispatching = false;
    }

    for (let i = 0; i < listeners.length; i += 1) {
      const listener = listeners[i];
      listener();
    }

    return state;
  }

  return {
    getState,
    // getSubState,
    // createSubState,
    dispatch,
    addListener,
  };
}
