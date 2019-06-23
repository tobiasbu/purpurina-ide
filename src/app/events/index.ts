import { ipcMain, dialog } from 'electron';
import Application from '../core/Application';
import createNewProject from '../project/createNewProject';
import ProjectManager from '../project/ProjectManager';

function startEditor(appControl: Application, projectPath: string) {
  try {
    const p = ProjectManager.openProject(projectPath, true);
    p.then((watcher) => {
      watcher.start(projectPath);
      appControl.settings.addRecentProject(projectPath);
      appControl.settings.save();
      appControl.startEditor();

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
        startEditor(appControl, project.path);
        ipcMain.removeAllListeners('createProject');
        // ProjectManagement.openProject(project.path, true);
      }
    }
  });

  ipcMain.on('launcher_openProject', (event: Electron.Event, openProject: IProjectInfo) => {

    startEditor(appControl, openProject.path);
    ipcMain.removeAllListeners('launcher_openProject');

    // appControl.settings.addRecentProject(openProject.path);
    // appControl.settings.save();
    // appControl.startEditor();
    // const watcher = ProjectManager.openProject(openProject.path, true);
    // watcher.start(openProject.path);

  });
}
