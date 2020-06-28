import { ipcRenderer } from 'electron';
import expose from './expose';

export default function exposeAssetsIPC() {
  expose('assets', {
    import: function (assets: ImportData.File[]) {
      return ipcRenderer.send('@assets/import', assets);
    },
  });
}
