import { ipcMain } from 'electron';
// import { ProjectInfo, CreateProject } from '@shared/types';

// import createNewProject from '../project/createNewProject';
// import ProjectManager from '../project/ProjectManager';

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
  once: boolean
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

// function startEditor(appControl: Application, project: ProjectInfo): void {
//   try {
//     const promise = ProjectManager.openProject(project);
//     promise.then((manager) => {
//       appControl.settings.addRecentProject(manager.path);
//       appControl.settings.save();
//       appControl.startEditor();
//     })
//       .catch((e) => {
//         throw e;
//       });
//   } catch (err) {
//     console.log('Could not start project.');
//   }
// }

// export default function registerEvents(appControl: Application) {

//   ipcMain.on('build', () => {

//     const options: Electron.MessageBoxOptions = {
//       title: 'teste',
//       buttons: ['OK'],
//       message: 'Hello World!',

//     };

//     dialog.showMessageBox(appControl.mainWindow, options);
//   });

//   ipcMain.on('createProject', (event: Electron.Event, createProjectInfo: CreateProject) => {

//     let project: ProjectInfo;

//     try {
//       project = createNewProject(createProjectInfo);
//     } catch (e) {
//       dialog.showMessageBox(appControl.mainWindow, {
//         type: 'error',
//         title: 'Could not create project',
//         message: e.message,
//         buttons: ['OK'],
//       });
//     } finally {
//       if (project) {
//         startEditor(appControl, project);
//         ipcMain.removeAllListeners('createProject');
//         // ProjectManagement.openProject(project.path, true);
//       }
//     }
//   });

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
