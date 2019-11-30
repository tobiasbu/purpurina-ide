/* eslint-disable import/first */
(window as any).global = window;

function evaluate(): void {
  throw new Error('Sorry, this app does not support window.eval().');
}

window.eval = evaluate;
// eslint-disable-next-line
global.eval = evaluate;

if (DEVELOPMENT) {
  console.log('Installing debug-menu');
  import('debug-menu').then((dm) => {
    dm.install();
  });
  // debugMenu.install(); // activate context menu
  import('source-map-support').then((sourceMapSupport) => {
    sourceMapSupport.install();
  });
}

import { ipcRenderer } from 'electron';
import hyper from 'hyperhtml';
import { ProjectInfo } from '@shared/types';

import './css/style.css';
import App from './App';

document.addEventListener('dragstart', (event) => event.preventDefault());
document.addEventListener('dragover', (event) => event.preventDefault());
document.addEventListener('drop', (event) => event.preventDefault());

let app: App;
if (!app) {
  app = new App();
}
const wrapRender = (): HTMLElement => {
  const mainEl = app.render();
  return mainEl;
};

const root = document.getElementById('root');
hyper.bind(root)`${wrapRender}`;

try {
  ipcRenderer.send('launcher_loaded');
  ipcRenderer.once('projects-loaded', (event: Electron.Event, projectsList: ProjectInfo[]) => {
    app.load(projectsList);
    // console.log(projectsList);
    // console.log('PROJECTS RECEIVED');
    console.log('SHOW');
    ipcRenderer.send('show_window');
    wrapRender();
  });

  if ((module as any).hot) {
    (module as any).hot.accept(() => {
      // console.log('HOT MODULE!');
      wrapRender();
    });
  }
} catch (e) {
  // console.error(e);
}

// function main() {

//   console.log('HELLO FROM LAUNCHER');

//   ipcRenderer.send('launcher_loaded');
//   ipcRenderer.once('projects-loaded', (event: Electron.Event, projectsList: IProjectInfo[]) => {
//       // menu.init(projectsList);
//     app.load(projectsList);
//     console.log('PROJECTS RECEIVED');
//     hyper.bind(root)`${wrapRender}`;
//     console.log('SHOW');
//     ipcRenderer.send('show_window');
//   });

// }

// main();

//   menu = new MenuControl();

//   ipcRenderer.send('launcher_loaded');

//   ipcRenderer.once('projects-loaded', (event: Electron.Event, projectsList: any) => {
//     menu.init(projectsList);
//   });
//     // new Promise<IProjectInfo[]>((resolve) => {

//     //     const projects: IProjectInfo[] = [];

//     //     for (let i = 0; i < 20; i++) {
//     //         projects.push({
//     //             name: 'Hello',
//     //             path: 'C:/Users/Admin/Documents',
//     //             version: '0.0.1',
//     //         })
//     //     }

//     //     resolve(projects);

//     // }).then((projectsList) => {
//     //     menu.init(projectsList);
//     // })
// };

// const contentNode = document.getElementById('content');

// p.then(function (projectsList)  {
//     hyper(contentNode)`${projectsList}`
// }).catch((e) => {
//     throw e;
// })
