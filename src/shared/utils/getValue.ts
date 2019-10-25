
/**
 * Get a valid `value`.
 * If value is null or undefined will return `defaultValue`.
 * @param value Value
 * @param defaultValue Default value
 */
export default function getValue<T extends any>(value: T, defaultValue?:T): T {
  if (value === null || value === undefined) {
    return defaultValue;
  }
  return value;
}
