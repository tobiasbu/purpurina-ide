import createStore from './lib/createStore';
import createConnector from './lib/createConnector';
import { Producer } from './types';
import createActionUtility from './lib/createActionUtility';
import mergerino from 'mergerino';
import createProducer from './lib/createProducer';

/**
 * Create Maestro state management environment.
 * @param initialState The initial state.
 */
export default function createMaestro<S = {}>(initialState?: S) {

  const store = createStore(initialState);
  const producer = createProducer(store);
  const connect = createConnector(store);
  const createAction = createActionUtility(producer);

  return {
    store,
    connect,
    createAction,
  };

}
