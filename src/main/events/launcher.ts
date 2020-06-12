import { dialog } from 'electron';
import { ProjectInfo, CreateProject } from '@shared/types';

import * as ipc from '@main/events/ipc';
import createNewProject from '@main/project/createNewProject';
import ProjectManager from '@main/project/ProjectManager';
import Application from '@main/core/Application';

function startEditor(appControl: Application, project: ProjectInfo): void {
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
    'create-project',
    (_event: Electron.Event, createProjectInfo: CreateProject) => {
      let project: ProjectInfo;
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
          ipc.clear('create-project');
        }
      }
    }
  );
}
