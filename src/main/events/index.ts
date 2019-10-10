import { ipcMain, dialog } from 'electron';
import { IProjectInfo, ICreateProject } from '@shared/types';

import Application from '../core/Application';
import createNewProject from '../project/createNewProject';
import ProjectManager from '../project/ProjectManager';

function startEditor(appControl: Application, project: IProjectInfo) {
  try {
    const promise = ProjectManager.openProject(project, true);
    promise.then((manager) => {
      appControl.settings.addRecentProject(manager.path);
      appControl.settings.save();
      appControl.startEditor();
    })
    .catch((e) => {
      throw e;
    });
  } catch (err) {
    console.log('Could not start project.');
  }
}

export default function registerEvents(appControl: Application) {

  ipcMain.on('build', () => {

    const options: Electron.MessageBoxOptions = {
      title: 'teste',
      buttons: ['OK'],
      message: 'Hello World!',

    };

    dialog.showMessageBox(appControl.mainWindow, options);
  });

  ipcMain.on('createProject', (event: Electron.Event, createProjectInfo: ICreateProject) => {

    let project: IProjectInfo;

    try {
      project = createNewProject(createProjectInfo);
    } catch (e) {
      dialog.showMessageBox(appControl.mainWindow, {
        type: 'error',
        title: 'Could not create project',
        message: e.message,
        buttons: ['OK'],
      });
    } finally {
      if (project) {
        startEditor(appControl, project);
        ipcMain.removeAllListeners('createProject');
        // ProjectManagement.openProject(project.path, true);
      }
    }
  });

  ipcMain.on('launcher_openProject', (event: Electron.Event, openProject: IProjectInfo) => {

    startEditor(appControl, openProject);
    ipcMain.removeAllListeners('launcher_openProject');

    // appControl.settings.addRecentProject(openProject.path);
    // appControl.settings.save();
    // appControl.startEditor();
    // const watcher = ProjectManager.openProject(openProject.path, true);
    // watcher.start(openProject.path);

  });
}
