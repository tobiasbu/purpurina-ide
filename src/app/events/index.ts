import { ipcMain, dialog, BrowserWindow } from "electron";
import ProjectManagement from "../project/ProjectManagment";
import Application from "../core/Application";
import { ICreateProject, IProjectInfo } from "../../shared/typings";


export default function registerEvents(appControl: Application) {

    ipcMain.on("build", () => {

        const options: Electron.MessageBoxOptions = {
            title: "teste",
            buttons: ['OK'],
            message: "Hello World!",

        }

        dialog.showMessageBox(appControl.mainWindow, options);
    });

    ipcMain.on("createProject", (event: Electron.Event, createProjectInfo: ICreateProject) => {

        let project: IProjectInfo;

        try {
            project = ProjectManagement.createNewProject(createProjectInfo);
        } catch (e) {
            dialog.showMessageBox(appControl.mainWindow, {
                type: 'error',
                title: 'Could not create project',
                message: e.message,
                buttons: ['OK']
            });
        } finally {
            if (project) {
                //ProjectManagement.openProject(project.path, true);
                appControl.settings.addRecentProject(project.path);
                appControl.settings.save();
            }
        }
    });


}

