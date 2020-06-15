/* eslint-disable no-console */
import { ipcMain, app } from 'electron';

import Application from './core/Application';
import EditorSettings from './core/EditorSettings';
import initializeGlobal from './core/config';
import loadRecentProjects from './project/loadRecentProjects';
import initializeLauncherEvents from './events/launcher';
import initializeDialogs from './events/dialogs';

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

  initializeLauncherEvents(AppControl);
  initializeDialogs(AppControl);

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
        let fn = console.log;
        if (level >= 3) {
          msg += ' [ERROR]';
          fn = console.error;
        } else {
          msg += ' [LOG]';
        }
        msg = `${msg} ${message}\nat ${line} from ${sourceId}\n`;
        fn(msg);
      }
    );

    // win.show();
    // win.focus()
    win.show();
    win.focus();
    win.webContents.openDevTools({ mode: 'undocked' });
    // ipcMain.on('show_window', () => {
    //   win.webContents.openDevTools();
    // });

    ipcMain.emit('projects-loaded', projects);
    ipcMain.on('launcher_loaded', (event: Electron.IpcMainEvent) => {
      console.log('hello ');
    });
  });
});

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  // require('electron-debug')();
  // const path = require('path');
  // const p = path.join(__dirname, '..', 'app', 'node_modules');
  // require('module').globalPaths.push(p);
}

// const installExtensions = async () => {
//     const installer = require('electron-devtools-installer');
//     const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
//     const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];
//     return Promise.all(
//         extensions.map(name => installer.default(installer[name], forceDownload))
//     ).catch(console.log);
// };
