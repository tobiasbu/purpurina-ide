import { ipcRenderer } from 'electron';
import expose from './expose';

export default function exposeAssetsIPC() {
  expose('assets', {
    import: function (asset: any) {
      return ipcRenderer.invoke('@assets/import', asset);
    },
  });
}
