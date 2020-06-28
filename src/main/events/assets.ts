import * as ipc from './ipc';
import Application from '@main/core/Application';

export default function init(appControl: Application) {
  ipc.on('@assets/import', (_event, assetsToImport: ImportData.File[]) => {
    appControl.projectManager.importer.load(assetsToImport);
    // for (let i = 0; i < assetsToImport.length; i += 1) {
    //   const asset = assetsToImport[i];
    //   if (typeof asset === 'object') {
    //   }
    // }
  });
}
