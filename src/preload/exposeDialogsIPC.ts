import { ipcRenderer } from 'electron';
import expose from './expose';

export default function exposeDialogsIPC() {
  expose('dialogs', {
    openDirectory: async function (options?: DialogsOptionsAPI.OpenDirectory) {
      return ipcRenderer.invoke('@dialogs/open-directory', options);
    },
  });
}
