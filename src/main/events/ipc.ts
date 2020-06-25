import { ipcMain } from 'electron';

type ElectronEventCallback = (
  event: Electron.IpcMainEvent,
  ...args: any[]
) => void;

/**
 * Listen to a Electron channel
 * @param name Channel name
 * @param callback Callback when the channel was emitted
 * @param once Should this listener execute once?
 */
export function on(
  name: string,
  callback: ElectronEventCallback,
  once?: boolean
): void {
  if (once) {
    ipcMain.once(name, callback);
  } else {
    ipcMain.on(name, callback);
  }
}
/**
 * Remove a listener from a Electron channel.
 * @param name Channel name
 * @param callback Callback when the channel was emitted
 */
export function off(name: string, callback: ElectronEventCallback): void {
  ipcMain.removeListener(name, callback);
}

/**
 * Clear all listeners from Electron channel.
 * @param name Channel name.
 */
export function clear(name: string): void {
  ipcMain.removeAllListeners(name);
}

export const handle = ipcMain.handle;

// export default function registerEvents(appControl: Application) {

//   ipcMain.on('launcher_openProject', (event: Electron.Event, openProject: ProjectInfo) => {

//     startEditor(appControl, openProject);
//     ipcMain.removeAllListeners('launcher_openProject');

//     // appControl.settings.addRecentProject(openProject.path);
//     // appControl.settings.save();
//     // appControl.startEditor();
//     // const watcher = ProjectManager.openProject(openProject.path, true);
//     // watcher.start(openProject.path);

//   });

//   // ipcMain.on('launcher_validatePath', (event: Electron.Event, message: { path: string }) => {
//   //   fse.access(message.path, (err) => {
//   //     console.log(err);
//   //   });
//   // });
// }
