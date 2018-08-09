
import {
  applyMiddleware,
  compose,
  createStore,
  Middleware,
} from "redux";

import { createLogger } from "redux-logger";

import { StoreState } from "./types";
import mainReducer from "./reducers";


const middleware: Middleware[] = [];

const logger = createLogger({
  timestamp: true,
  predicate: (getState: () => any, action: any): boolean => {
    //if (!reduxLoggingEnabled()) return false;
    //return shouldLogAction(action);
    return true;
  },
  diff: true,
});

const storeEnchanter = applyMiddleware(...middleware);

middleware.push(logger);


const enhancer = compose(
  storeEnchanter
);

const initialState: StoreState = {

}

const store = createStore(mainReducer, initialState, enhancer);

export default store;

(window as any).ReduxStore = store;