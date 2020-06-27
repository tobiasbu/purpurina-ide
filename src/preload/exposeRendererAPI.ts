import { ipcRenderer } from 'electron';
import expose from './expose';

export default function exposeRendererAPI() {
  expose('renderer', {
    show: function () {
      ipcRenderer.send('@renderer/show');
    },
    ready: async function () {
      return ipcRenderer.invoke('@renderer/ready');
    },
  });
}
