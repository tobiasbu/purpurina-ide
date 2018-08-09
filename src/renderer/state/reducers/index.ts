import { StateAction, StoreState } from "../types";




export default function mainReducer(state: StoreState, action: StateAction): StoreState {
    switch (action.type) {
     // case INCREMENT_ENTHUSIASM:
       // return { ...state, enthusiasmLevel: state.enthusiasmLevel + 1 };
      //case DECREMENT_ENTHUSIASM:
       // return { ...state, enthusiasmLevel: Math.max(1, state.enthusiasmLevel - 1) };
      default:
        return state;
    }
  }