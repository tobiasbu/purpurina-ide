import { Platform } from 'shared/types';

// eslint-disable-next-line
const INVALID_FOLDER_CHARS = /[<>:\x22\/\\|?*\x00-\x1F]+/;
// eslint-disable-next-line
const INVALID_PATH_CHARS = /[<>:\x22|?*\x00-\x1F]+/;
// const PATH_VALIDATOR = /^(\/|\\)([A-z0-9-_+]+\/)*([A-z0-9]+)(\/|\\)?$/i;
const WIN_SPECIAL_CHARS = /^(?:aux|con|clock\$|nul|prn|com[1-9]|lpt[1-9])$/i;
const WIN_DISK = /^([a-zA-Z]:)(\\|\/)/;

export function folderName(value: string): string {
  if (value.length === 0 || value.trim().length === 0) {
    return 'Please give a name for your project';
  }

  if (WIN_SPECIAL_CHARS.test(value)) {
    const match = WIN_SPECIAL_CHARS.exec(value);
    return `Illegal word '${match[0]}'. This is a system reserved word.`;
  }

  if (INVALID_FOLDER_CHARS.test(value)) {
    return `Illegal characters. Make sure to not use the following
      characters: <, >, :, ", /, \\, |, ?, *`;
  }

  return '';
}

export function path(value: string): string {
  let v = value;

  if (v.length === 0 || v.trim().length === 0) {
    return 'The project location can not be empty.';
  }

  // if (getPlatform() === Platform.Windows) {
  if (!WIN_DISK.test(v)) {
    return 'The path is not absolute.';
  }
  // }

  v = value.substr(2);

  if (INVALID_PATH_CHARS.test(v)) {
    return `Invalid path characters. Make sure to not use the following
      characters: <, >, :, \\, |, ?, *`;
  }
  if (v.length > 3) {
    if (v[v.length - 1] === '\\' || v[v.length - 1] === '/') {
      v = v.slice(0, -1);
    }
    const e = v.split(/(\\|\/)/g).pop();

    if (e.length <= 0) {
      return 'The directory is invalid.';
    }
  }

  return '';
}
