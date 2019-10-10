
export function replaceAll(str: string, searchValue: RegExp, replaceValue: string) {
  return str.replace(new RegExp(searchValue, 'g'), replaceValue);
}

export function interpolateClassName(name: string) {
  return replaceAll(name.toLowerCase().trim(), /\s/, '-');
}
