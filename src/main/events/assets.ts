import * as ipc from './ipc';

export default function init() {
  ipc.on('@assets/import', (_event, assetsToImport: ImportData.File[]) => {
    for (let i = 0; i < assetsToImport.length; i += 1) {
      const asset = assetsToImport[i];
      if (typeof asset === 'object') {
      }
    }
  });
}
