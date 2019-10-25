
(window as any).global = window;

(window as any).eval = global.eval = function () {
  throw new Error('Sorry, this app does not support window.eval().');
};

if (DEVELOPMENT) {
  console.log('Installing debug-menu');
  const debugMenu = require('debug-menu');
  debugMenu.install();  // activate context menu
}

import './css/style.css';
import hyper from 'hyperhtml';
import App from './App';
import { ipcRenderer } from 'electron';
import { IProjectInfo } from 'shared/types';

document.addEventListener('dragstart', event => event.preventDefault());
document.addEventListener('dragover', event => event.preventDefault());
document.addEventListener('drop', event => event.preventDefault());

console.log('#######################hello');

const app = new App();
const wrapRender = function () {
  const mainEl = app.render();
  return mainEl;
};
const root = document.getElementById('root');
hyper.bind(root)`${wrapRender}`;

ipcRenderer.send('launcher_loaded');
ipcRenderer.once('projects-loaded', (event: Electron.Event, projectsList: IProjectInfo[]) => {
  app.load(projectsList);
  console.log(projectsList);
  console.log('PROJECTS RECEIVED');
  console.log('SHOW');
  ipcRenderer.send('show_window');
  wrapRender();
});

if ((module as any).hot) {
  (module as any).hot.accept(() => {
    console.log('HOT MODULE!');
    wrapRender();
  });
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
