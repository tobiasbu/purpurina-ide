import { MapEachFunction, MapFindPredicate } from './types';

export default class CustomMap<K extends string | number, V extends any> {
  //[Symbol.iterator](): IterableIterator<[K, V]>;

  private _content: {
    [indexer: string]: V;
    [indexer: number]: V;
  };
  private _size: number;

  constructor() {
    this._content = {};
    this._size = 0;
  }

  get size() {
    return this._size;
  }

  /* 
    Add or set value to the map
    key = keyName
    value = value
    */
  set(key: K, value: V): this {
    return this.insert(key, value);
  }

  insert(key: K, value: V): this {
    if (!this.has(key)) {
      this._size++;
    }

    this._content[key] = value;

    return this;
  }

  get(key: K): V | null {
    if (key === undefined) return null;

    if (this.has(key)) {
      return this._content[key];
    } else {
      return null;
    }
  }

  at(index: number): V | null {
    let n = 0;
    for (let key in this._content) {
      if (index === n) {
        return this._content[key];
      }
      n++;
    }

    return null;
  }

  has(key: K): boolean {
    return this._content.hasOwnProperty(key);
  }

  contains(value: V): boolean {
    for (let key in this._content) {
      if (this._content[key] === value) {
        return true;
      } else continue;
    }

    return false;
  }

  keys(): {} {
    return Object.keys(this._content);
  }

  values(): V[] {
    var values = [];
    var content = this._content;

    for (var key in content) values.push(this._content[key]);

    return values;
  }

  remove(key: K): V {
    if (!this.has(key)) return null;

    var prop = this._content[key];
    delete this._content[key];
    this._size--;
    return prop;
  }

  erase(key: K): V {
    if (!this.has(key)) return null;

    let content = this._content[key];
    delete this._content[key];
    this._size--;

    return content;
  }

  /*eraseAt(key) {
  
      //if (!this.hasTagInKey(key))
      //  return false;
        this._size--;
       delete this._content[key];
  
    }*/

  eraseList(listToRemove: K[]): this {
    if (listToRemove === undefined) return this;

    let size = listToRemove.length;

    if (Array.isArray(listToRemove)) {
      for (let i = 0; i < size; i++) {
        let index = listToRemove[i];
        this.erase(index);
      }
    }

    return this;
  }

  /*deleteByIndexedArray(array) {
      for (let i = 0; i < array.length; i++) {
        delete this._content[array[i]];
        this._size--;
      }
  
    }*/

  clear(): void {
    for (let property in this._content) {
      delete this._content[property];
    }
    this._size = 0;
  }

  slowSize(): number {
    return Object.keys(this._content).length;
  }

  each(callback: MapEachFunction<V>, context?: any): V | undefined {
    let content = this._content;
    let r;
    if (context === undefined) {
      for (let property in content) {
        r = callback(property, content[property]);
        if (r !== undefined) break;
      }
    } else {
      for (let property in content) {
        r = callback.call(context, property, content[property]);
        if (r !== undefined) break;
      }
    }

    return r;
  }

  find(predicate: MapFindPredicate<V>) {
    if (predicate === undefined) return undefined;

    let content = this._content;

    for (let property in content) {
      if (predicate(property, content[property])) {
        return content[property];
      }
    }

    return null;
  }
}
