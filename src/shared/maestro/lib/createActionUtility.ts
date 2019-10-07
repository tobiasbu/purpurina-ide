import { Producer } from '../types';

type AnyCallback = (...args: any[]) => any | void;
type Actions<A> = {
  [P in keyof A]: A[P] extends AnyCallback ? A[P] : never;
};
type ActionProducer<S, T> = (dispatcher: Producer<S>, state?: Readonly<S>) => Actions<T>;

export default function createActionUtility<S>(producer: Producer<S>) {

  return function createAction<T>(action: ActionProducer<S, T>) {
    const actions = action(producer);
    return actions;
  };

}
