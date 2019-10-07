import { Component, WiredTemplateFunction } from 'hyperhtml';

export interface PlainObject { }

// export interface Action {
//   [indexer: string]: any;
//   [indexer: number]: any;
// }

export type Listener = () => void;

export interface IListenerMap {
  new(): IListenerMap;
  [indexer: string]: Listener[] | Listener;
}

// export type Reducer<S, A extends Action = Action> =
//   (state: S, action: A) => S;

// export interface SubState<S, A extends Action = Action> {
//   state: S;
//   reducer: Reducer<S, A>;
//   listeners: IListenerMap;
// }

export type Action<S> = (state: Readonly<S>, ...args: any[]) => S;

export type DispatchFunction<S> =
  (action: Action<S>, ...args: any[]) => S;

/**
 * Represents the data producer.
 */
export interface Producer<S> {
  reduce(state: Partial<S>): Readonly<S>;
  readonly state: Readonly<S>;
  // replace<K extends keyof S>(stateProp:K, state: S[K]);
}

export interface Store<S = {}> {
  getState(): Readonly<S>;
  addListener(listener: Listener): void;
  addListener(substate: string | number, listener: Listener): void;
  // getSubState<SS>(name: string | number): Readonly<SS>;
  dispatch: DispatchFunction<S>;
  // createSubState<SS, SA extends Action = Action>(
  //   name: string | number, reducer: Reducer<SS, SA>, initialState?: SS,
  // ): SubState<SS, SA> | false;

}

export interface MaestroComponent<T = {}> extends Component<T> {
  html: WiredTemplateFunction;
  render?(): void;
}

export interface MaestroComponentConstructor<T extends MaestroComponent> {
  new(...props: any[]): T;
}
