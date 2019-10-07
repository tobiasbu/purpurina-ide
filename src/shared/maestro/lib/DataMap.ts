export type MapEachFunction<K, V> = (key: K, value: V) => any;
export type MapFindPredicate<V> = (property: string, value: V) => void | boolean | number;

export default class DataMap<K extends string | number, V extends any> {

  private data: {
    [indexer: string]: V;
    [indexer: number]: V;
  };

  private dataSize: number;

  constructor() {
    this.data = {};
    this.dataSize = 0;
  }

  get size(): number {
    return this.dataSize;
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
      this.dataSize += 1;
    }

    this.data[key] = value;

    return this;
  }

  get(key: K): V | null {

    if (key === undefined) return null;

    if (this.has(key)) {
      return this.data[key];
    }

    return null;
  }

  at(index: number): V | null {
    let n = 0;
    for (const key in this.data) {
      if (index === n) {
        return this.data[key];
      }
      n += 1;
    }

    return null;
  }

  has(key: K): boolean {
    return this.data.hasOwnProperty(key);
  }

  contains(value: V): boolean {
    for (const key in this.data) {
      if (this.data[key] === value) {
        return true;
      }
    }

    return false;
  }

  keys(): string[] {
    return Object.keys(this.data);
  }

  values(): V[] {
    const values = [];
    const content = this.data;

    for (const key in content) {
      values.push(this.data[key]);
    }

    return values;
  }

  erase(key: K): V {

    if (!this.has(key)) {
      return null;
    }

    const content = this.data[key];
    delete this.data[key];
    this.dataSize -= 1;

    return content;
  }

  eraseList(listToRemove: K[]): this {

    if (listToRemove === undefined) return this;

    const size = listToRemove.length;

    if (Array.isArray(listToRemove)) {

      let index;
      for (let i = 0; i < size; i += 1) {
        index = listToRemove[i];
        this.erase(index);
      }
    }

    return this;
  }

  clear(): void {
    for (const property in this.data) {
      delete this.data[property];
    }
    this.dataSize = 0;
  }

  slowSize(): number {
    return Object.keys(this.data).length;
  }

  each(callback: MapEachFunction<K, V>, context?: any): V | undefined {
    const content = this.data;
    let r;
    if (context === undefined) {
      for (const property in content) {
        r = callback(property as K, content[property]);
        if (r !== undefined) {
          break;
        }
      }
    } else {
      for (const property in content) {
        r = callback.call(context, property, content[property]);
        if (r !== undefined) {
          break;
        }
      }
    }

    return r;
  }

  find(predicate: MapFindPredicate<V>) {

    if (predicate === undefined) {
      return undefined;
    }

    const content = this.data;

    for (const property in content) {

      if (predicate(property, content[property])) {
        return content[property];
      }

    }

    return null;
  }
}
