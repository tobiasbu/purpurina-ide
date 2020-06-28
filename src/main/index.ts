/* eslint-disable no-console */
import { ipcMain, app } from 'electron';

import Application from './core/Application';
import EditorSettings from './core/EditorSettings';
import initializeGlobal from './core/config';
import loadRecentProjects from './project/loadRecentProjects';

import initializeAssets from './events/assets';
import initializeProject from './events/project';
import initializeDialogs from './events/dialogs';
import initializeBrowserWindow from './events/browserWindow';

import Logger from './logger';

if (__PURPUR_DEV__) {
  // Logger.log(
  //   `Directory: ${__dirname}. Port: ${process.env.ELECTRON_WEBPACK_WDS_PORT}`
  // );
  // const sourceMapSupport = require('source-map-support'); // eslint-disable-line
  // sourceMapSupport.install({
  //   environment: 'node',
  // });
}

initializeGlobal();

const settings = EditorSettings.load();
const AppControl = new Application(settings);

app.once('ready', () => {
  AppControl.initialize();

  initializeAssets();
  initializeProject(AppControl);
  initializeDialogs(AppControl);
  initializeBrowserWindow(AppControl);

  const initPromise = AppControl.startLauncher();
  const loaderPromise = loadRecentProjects(settings.recentProjects);

  Promise.all([initPromise, loaderPromise]).then((result) => {
    const projects = result[1];
    const win = result[0];
    // for some reason HMR, some middleware or anything else is blocking the first render
    // we force to reload the web contents:
    if (__PURPUR_DEV__) {
      win.webContents.reload();
    }
    win.webContents.on(
      'console-message',
      (
        _event: Electron.IpcMainEvent,
        level: number,
        message: string,
        line: number,
        sourceId: string
      ) => {
        let msg = '[WINDOW]';
        let fn = Logger.log;
        if (level >= 3) {
          msg += ' [ERROR]';
          fn = Logger.error;
        } else {
          msg += ' [LOG]';
        }
        msg = `${msg} ${message}\nat ${line} from ${sourceId}\n`;
        fn(msg);
      }
    );

    ipcMain.on('@renderer/show', (event) => {
      const mainWindow = AppControl.mainWindow;
      if (mainWindow !== null) {
        mainWindow.show();
        mainWindow.focus();
        mainWindow.webContents.openDevTools({ mode: 'undocked' });
      }
    });

    ipcMain.handle('@renderer/ready', (event: Electron.IpcMainEvent) => {
      return projects;
    });
  });
});
