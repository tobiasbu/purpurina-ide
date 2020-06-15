import { ipcRenderer } from 'electron';
import expose from './expose';
export default function createDialogsHelpers() {
  expose('dialogs', {
    openDirectory: async function (options?: DialogsAPI.OpenDirectoryOptions) {
      return ipcRenderer.invoke('@dialogs/open-directory', options);
    },
  });
}
