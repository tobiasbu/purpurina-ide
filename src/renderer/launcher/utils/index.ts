export function replaceAll(
  str: string,
  searchValue: RegExp,
  replaceValue: string
): string {
  return str.replace(new RegExp(searchValue, 'g'), replaceValue);
}

export function interpolateClassName(name: string): string {
  return replaceAll(name.toLowerCase().trim(), /\s/, '-');
}
