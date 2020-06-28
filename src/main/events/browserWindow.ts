import * as ipc from '@main/events/ipc';
import Application from '@main/core/Application';

export default function initializeBrowseWindow(appControl: Application): void {
  ipc.on(
    '@browserWindow/close',
    async (_event: Electron.IpcMainInvokeEvent) => {
      if (__PURPUR_DEV__) {
        _event.sender.closeDevTools();
      }
      appControl.mainWindow.close();
    }
  );
  ipc.on(
    '@browserWindow/minimize',
    async (_event: Electron.IpcMainInvokeEvent) => {
      const window = appControl.mainWindow;
      if (!window.isMinimized() && window.isMinimizable()) {
        appControl.mainWindow.minimize();
      }
    }
  );
}
