import { app } from 'electron';
import type minimist from 'minimist';

import createContextualizer from './contextualizer';

interface ParsedCLIArgs extends minimist.ParsedArgs {
  project?: string;
  version?: boolean;
}

async function main() {
  async function parseCLIArgs(argv: string[]): Promise<ParsedCLIArgs> {
    return import(/* webpackChunkName: "minimist" */ 'minimist').then(
      (parser) => {
        const parsedArgs = parser.default(argv, {
          boolean: ['version'],
          alias: {
            v: 'version',
          },
        });
        const projectPath = parsedArgs._[0];
        return { ...parsedArgs, project: projectPath };
      }
    );
  }

  const argsTest = ['C:/', '--version'];
  const parsedArgs = await parseCLIArgs(argsTest);

  if (parsedArgs.version) {
    console.log('Purpurina Editor v0.0.1');
  }

  console.log(parsedArgs);

  app.once('ready', () => {
    const contextualizer = createContextualizer();

    const shared = require('./contexts/shared/index.ts');
    contextualizer.shareContext(shared);

    if (!parsedArgs.project) {
      // contextualizer.changeContext(require('./contexts/launcher/index.ts'));
      return;
    }
  });
}

main();

// import Application from './core/Application';
// import EditorSettings from './core/EditorSettings';
// import initializeGlobal from './core/config';
// import loadRecentProjects from './project/loadRecentProjects';
// import initializeProject from './events/ProjectAPI';
// import initializeDialogs from './events/DialogsAPI';

// import Logger from './logger';

// if (__PURPUR_DEV__) {
//   // Logger.log(
//   //   `Directory: ${__dirname}. Port: ${process.env.ELECTRON_WEBPACK_WDS_PORT}`
//   // );
//   // const sourceMapSupport = require('source-map-support'); // eslint-disable-line
//   // sourceMapSupport.install({
//   //   environment: 'node',
//   // });
// }

// initializeGlobal();

// const settings = EditorSettings.load();
// const AppControl = new Application(settings);

// app.once('ready', () => {
//   AppControl.initialize();

//   initializeProject(AppControl);
//   initializeDialogs(AppControl);

//   const initPromise = AppControl.startLauncher();
//   const loaderPromise = loadRecentProjects(settings.recentProjects);

//   Promise.all([initPromise, loaderPromise]).then((result) => {
//     const projects = result[1];
//     const win = result[0];
//     // for some reason HMR, some middleware or anything else is blocking the first render
//     // we force to reload the web contents:
//     if (__PURPUR_DEV__) {
//       win.webContents.reload();
//     }
//     win.webContents.on(
//       'console-message',
//       (
//         _event: Electron.IpcMainEvent,
//         level: number,
//         message: string,
//         line: number,
//         sourceId: string
//       ) => {
//         let msg = '[WINDOW]';
//         let fn = Logger.log;
//         if (level >= 3) {
//           msg += ' [ERROR]';
//           fn = Logger.error;
//         } else {
//           msg += ' [LOG]';
//         }
//         msg = `${msg} ${message}\nat ${line} from ${sourceId}\n`;
//         fn(msg);
//       }
//     );

//     ipcMain.on('@renderer/show', (event) => {
//       const mainWindow = AppControl.mainWindow;
//       if (mainWindow !== null) {
//         mainWindow.show();
//         mainWindow.focus();
//         mainWindow.webContents.openDevTools({ mode: 'undocked' });
//       }
//       Logger.log(event.sender);
//     });

//     ipcMain.handle('@renderer/ready', (event: Electron.IpcMainEvent) => {
//       return projects;
//     });
//   });
// });
