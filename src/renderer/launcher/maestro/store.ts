import DataMap from './DataMap';
import isPlainObject from '../../../shared/utils/isPlainObject';

interface PlainObject {}
type StateTypes = number | string | boolean | PlainObject;

interface StateHolder {
  data: any;
}

interface StateDescriber<T> {
  data: T;
}

export class Store {

  private stateMap: DataMap<string | number, StateHolder>;

  createState(name: string | number, initialState?: StateTypes): StateHolder | false {
    if (this.stateMap.has(name)) {
      return false;
    }
    if (typeof (initialState) === 'object') {
      if (!isPlainObject(initialState)) {
        console.error('Maestro: Could not create state. Initial state is not plain object.');
        return false;
      }

    }
    const holder: StateHolder = {
      data: initialState,
    };
    this.stateMap.set(name, holder);
    return holder;
  }

}
