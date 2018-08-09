import { Action } from "redux";

type StateActionType = 'init';

export interface StateAction extends Action<StateActionType> {
    payload?: any;
}

export interface StoreState  {

}