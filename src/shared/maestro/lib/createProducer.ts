import { Store, Producer } from '../types';
import mergerino from 'mergerino';

export default function createProducer<S>(store: Store<S>) {

  // tslint:disable-next-line: function-name
  const producer = {
    reduce(statePatch:Partial<S>) {
      return store.dispatch(mergerino, statePatch);
    },
  };

  Object.defineProperty(producer, 'state', {
    enumerable: true,
    configurable: false,
    get () {
      return store.getState();
    },
  });

  return producer as Producer<S>;

}
