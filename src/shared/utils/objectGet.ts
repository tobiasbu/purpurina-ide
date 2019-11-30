type TypeOfValue<T> =
  T extends boolean ? boolean :
  T extends string ? string :
  T extends number ? number :
  T extends undefined ? undefined :
  T extends object ? T :
  T extends Function ? AnyType : AnyType;

/**
 * Get property from object by given key.
 * If there is no property return a default value otherwise undefined.
 * @param obj Plain object
 * @param key Object key
 * @param defaultValue Default value when the property is not available.
 */
function objectGet<T extends object,
  K extends keyof T, V extends T[K]>(obj: T, key: K, defaultValue?: V): V;
function objectGet<T extends string | number,
  K extends never, V extends TypeOfValue<T>>(obj: T, key: K, defaultValue: V = undefined): V {
  const type = typeof (obj);

  if (!obj || type === 'number' || type === 'string') {
    return defaultValue;
  }

  if (obj.hasOwnProperty(key) && obj[key] !== undefined) {
    return obj[key];
  }
  return defaultValue;
}

export default objectGet;
