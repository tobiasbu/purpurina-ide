import createStore from './lib/createStore';
import { createActionUtility } from './lib/actionUtility';
import createProducer from './lib/createProducer';

/**
 * Create Maestro state management environment.
 *
 * @param initialState The initial state.
 */
export default function createMaestro<S = {}>(initialState?: S) {

  const store = createStore(initialState);
  const producer = createProducer(store);
  const createAction = createActionUtility(producer);

  return {
    store,
    createAction,
    producer,
  };

}
