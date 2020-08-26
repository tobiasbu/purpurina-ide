type ValueType = string | number | boolean | object;

/**
 * Get a valid `value`.
 * If value is null or undefined will return `defaultValue`.
 *
 * @param value Value
 * @param defaultValue Default value
 * @deprecated
 */
export default function getValue<T extends ValueType>(
  value: T,
  defaultValue?: T
): T {
  if (value === null || value === undefined) {
    return defaultValue;
  }
  return value;
}
