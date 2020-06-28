import { ipcRenderer } from 'electron';
import expose from './expose';

export default function exposeBrowserWindowIPC() {
  expose('browserWindow', {
    show: function () {
      ipcRenderer.send('@renderer/show');
    },
    minimize: function () {
      ipcRenderer.send('@browserWindow/minimize');
    },
    close: function () {
      ipcRenderer.send('@browserWindow/close');
    },
    ready: async function () {
      return ipcRenderer.invoke('@renderer/ready');
    },
  });
}
