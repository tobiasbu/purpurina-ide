import { Store, Producer, StateKey, StateValue } from '../types';
import mergerino from 'mergerino';

export default function createProducer<S>(store: Store<S>) {

  function replaceFn<S>(state: S) {
    return state;
  }

  const producer = {
    update(statePatch: Partial<S>) {
      return store.dispatch(mergerino, statePatch);
    },
    set<K, V>(prop: StateKey<S, K>, value: StateValue<S, K, V>) {
      return store.dispatch(mergerino, { [prop]: value });
    },
    replace(newState: S) {
      return store.dispatch(replaceFn, newState);
    },
  };

  Object.defineProperty(producer, 'state', {
    enumerable: true,
    configurable: false,
    get() {
      return store.getState();
    },
  });

  return producer as Producer<S>;

}
