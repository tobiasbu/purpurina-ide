import { dialog } from 'electron';

import type IpcContext from '@main/contextualizer/IpcContext';
import { objectGet } from '@shared/utils';

export default function sharedIpcApis(ipc: IpcContext): void {
  ipc.createApi('@dialogs', {
    handle: {
      'open-directory': async function (
        _event: Electron.IpcMainInvokeEvent,
        options: Dialogs.Options.OpenDirectory
      ) {
        console.log('hi');
        // const result = await dialog.showOpenDialog(appControl.mainWindow, {
        //   defaultPath: objectGet(options, 'defaultPath', ''),
        //   title: objectGet(options, 'title', 'Select directory'),
        //   buttonLabel: options?.buttonLabel,
        //   message: options?.message,
        //   properties: ['openDirectory', 'createDirectory', 'noResolveAliases'],
        // });
      },
    },
  });
  // ipc.handle(
  //   '@dialogs/open-directory',
  //   async (
  //     _event: Electron.IpcMainInvokeEvent,
  //     options: DialogsOptionsAPI.OpenDirectory
  //   ) => {

  //     if (result.canceled) {
  //       return false;
  //     }
  //     return result.filePaths[0];
  //   }
  // );
}
