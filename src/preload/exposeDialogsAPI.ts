import { ipcRenderer } from 'electron';
import expose from './expose';

export default function exposeDialogsAPI() {
  expose('dialogs', {
    openDirectory: async function (options?: Dialogs.Options.OpenDirectory) {
      return ipcRenderer.invoke('@dialogs/open-directory', options);
    },
  });
}
