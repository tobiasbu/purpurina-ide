import { dialog } from 'electron';

import * as ipc from '@main/events/ipc';
import createNewProject from '@main/project/createNewProject';
import ProjectManager from '@main/project/ProjectManager';
import Application from '@main/core/Application';

function startEditor(appControl: Application, project: Project.Metadata): void {
  try {
    const promise = ProjectManager.openProject(project);
    promise
      .then((manager) => {
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

export default function initializeLauncherEvents(
  appControl: Application
): void {
  ipc.on(
    '@project/create',
    (_event: Electron.Event, createProjectInfo: Project.Create) => {
      let project: Project.Metadata;
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
          ipc.clear('@project/create');
        }
      }
    }
  );
}
