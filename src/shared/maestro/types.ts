import { Component, WiredTemplateFunction } from 'hyperhtml';

type AnyCallback = (...args: any[]) => any | void;
export type StateKey<S, K> = K extends keyof S ? keyof S : string | number;
export type StateValue<S, K, V> = K extends keyof S ? S[K] : V;
export type StatePart<K extends string | number | symbol, V> = {
  [T in K]: V;
};

/**
 * Action callback.
 */
export type Action<S> = (state: Readonly<S>, ...args: any[]) => S;

/**
 * Group of actions.
 */
export type ActionGroup<A> = {
  [P in keyof A]: A[P] extends AnyCallback ? A[P] : never;
};

/**
 * Action producer.
 */
export type ActionProducer<S, A> = (dispatcher: Producer<S>) => ActionGroup<A>;

/**
 * A producer is a way to update the state.
 *
 * All functions receive the state an then dispatch to store to update it.
 */
export interface Producer<S> {
  /**
   * Update the state by merging new data or change existent data.
   * @param statePatch Partial state or a new part of state.
   */
  update<A>(statePatch: Partial<S> | A): Readonly<S> | Readonly<S & A>;

  /**
   * Shortcut function to change data in a existent property of the state.
   * Under the hood, it uses merge strategy (it will always return new state).
   * @param prop Property name.
   * @param value New value.
   *
   * @example
   * // Our current state
   * const state = { temperature: 20, units: 'C', date: { day: 12, month: 8, year: 2019 } }
   * // Change the property temperature
   * set('temperature', 30);
   * // state = { ... temperature: 30 ... }
   * // Change part of property object
   * set('date', { day: 25, month: 1 });
   * // state = { ... date: { day: 25, month: 1, year: 2019 } ... }
   */
  set<K extends keyof S, V extends S[K]>(prop: K, value: V): Readonly<S>;
  /**
   * Set new data in state.
   * @param prop A new property name.
   * @param value Property value.
   * @example
   * // You can also append new data:
   * set('details', { isSunny: true } );
   * // state = { ... details: { isSunny: true } ... }
   */
  set<K extends string | number, V extends any>(prop: K, value: V): Readonly<S & StatePart<K, V>>;

  /**
   * Replace the entire state by a new state.
   *
   * Beware! Use this function with **caution** or you can lost data.
   * @param newState New state.
   * @example
   * // Our current state
   * const state = { profile: { name: 'Thomas' lastName: 'Edson' } }
   * // Using replace with new data:
   * replace( { temperature: 20, units: 'C' } );
   * // The state will be { temperature: 20, units: 'C' }
   *
   */
  replace(newState: S): Readonly<S>;
  /**
   * Current state.
   *
   * **Note:**
   * You can update the state using this reference but it will not dispatch to store
   * until you call `producer.forceUpdate()`. It's **not recommend** to use this strategy,
   * use only for consulting.
   */
  readonly state: Readonly<S>;
}

export type Listener = () => void;

export interface IListenerMap {
  new(): IListenerMap;
  [indexer: string]: Listener[] | Listener;
}

export type RemoveListener = () => void;

/**
 * A store holds the global and main `state` of your application.
 *
 * The state is usually a plain object. You can add any data depending of your application needs.
 *
 * To update the state, you must dispatch a `action`.
 * In Maestro actions are pure functions where:
 * - receives the current state
 * - updates (or not) the state
 * - and returns the updated state
 * Since `actions` are basically a function, you can create any logic before
 * to operate in the state.
 *
 * The updates of the state can be made by a `producer`.
 * A producer is a utility that dispatches the desired changes of the state to the store.
 * Producer *produces* a new state.
 *
 * After the store applied a `action` dispatched by a `producer` or any way you want,
 * the store will update the application.
 */
export interface Store<S = {}> {
  /**
   * Returns current state.
   * @returns {S} The state.
   */
  getState(): Readonly<S>;
  /**
   * Dispatch an action.
   * @param action The action callback.
   * @param args Additional arguments to be passed to the action.
   * @returns {S} The state.
   */
  dispatch: (action: Action<S>, ...args: any[]) => S;
  addListener(listener: Listener): RemoveListener;
  addListener(substate: string | number, listener: Listener): RemoveListener;
  // getSubState<SS>(name: string | number): Readonly<SS>;

  // createSubState<SS, SA extends Action = Action>(
  //   name: string | number, reducer: Reducer<SS, SA>, initialState?: SS,
  // ): SubState<SS, SA> | false;

}

export type StatefulFunctionalComponent<S = {}> = (
  state?: S, ...args: any[]
) => HTMLElement;

export type FunctionalComponent = (...args: any[]) => HTMLElement;

export interface IComponent<S = {}> {
  // readonly html: WiredTemplateFunction;
  readonly state: S;
  render?(): HTMLElement | any;
}

export type Constructor<T> = { new(...props: any[]): T };

export type ComponentTypes = Constructor<IComponent> |
  StatefulFunctionalComponent | FunctionalComponent;
