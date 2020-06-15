import * as ipc from '@main/events/ipc';
import Application from 'main/core/Application';
import { dialog } from 'electron';
import { objectGet } from 'shared/utils';

export default function initializeDialogs(appControl: Application): void {
  ipc.handle(
    '@dialogs/open-directory',
    async (
      _event: Electron.IpcMainInvokeEvent,
      options: DialogsAPI.OpenDirectoryOptions
    ) => {
      const result = await dialog.showOpenDialog(appControl.mainWindow, {
        defaultPath: objectGet(options, 'defaultPath', ''),
        title: objectGet(options, 'title', 'Select directory'),
        buttonLabel: options?.buttonLabel,
        message: options?.message,
        properties: ['openDirectory', 'createDirectory', 'noResolveAliases'],
      });

      if (result.canceled) {
        return false;
      }
      return result.filePaths[0];
    }
  );
}
