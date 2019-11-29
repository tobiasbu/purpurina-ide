import { remote } from 'electron';
import objectGet from './utils/objectGet';

interface OpenDirectoryOptions {
  title?: string;
  defaultPath?: string;
}

/**
 * Open directory dialog.
 * @param defaultPath Set a custom default path.
 * @returns {string} The selected path otherwise null.
 */
export function openDirectory(options?: OpenDirectoryOptions): string {
  const currentWindow = remote.getCurrentWindow();
  const path = remote.dialog.showOpenDialogSync(currentWindow, {
    defaultPath: objectGet(options, 'defaultPath'),
    title: objectGet(options, 'title'),
    properties: ['createDirectory', 'openDirectory'],
  });
  if (path) {
    return path[0];
  }
  return null;
}
