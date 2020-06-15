// import { ipcRenderer } from 'electron';
import hyper from 'hyperhtml';

import './css/style.css';
import App from './App';

function evaluate(): void {
  throw new Error('Sorry, this app does not support window.eval().');
}

(window as any).global = window;
/* eslint-disable-next-line no-eval */
window.eval = evaluate;
global.eval = evaluate;

let installed = false;
// if (DEVELOPMENT && !installed) {
//   // eslint-disable-next-line
//   console.log('Installing debug-menu');
//   // import('debug-menu').then((dm) => {
//   //   dm.install();
//   // });
//   // debugMenu.install(); // activate context menu
//   import('source-map-support').then((sourceMapSupport) => {
//     sourceMapSupport.install();
//   });
//   installed = true;
// }

document.addEventListener('dragstart', (event) => event.preventDefault());
document.addEventListener('dragover', (event) => event.preventDefault());
document.addEventListener('drop', (event) => event.preventDefault());

console.log('hi');

const app = new App();
const wrapRender = (): HTMLElement => {
  const mainEl = app.render();
  return mainEl;
};

const root = document.getElementById('root');
hyper.bind(root)`${wrapRender}`;

try {
  window.renderer.ready().then((projects) => {
    app.load(projects);
    wrapRender();
    window.renderer.show();
  });

  // window.project.on.loaded().then((projects) => {

  // });
  // ipcRenderer.send('launcher_loaded');
  // ipcRenderer.once(
  //   'projects-loaded',
  //   (event: Electron.Event, projectsList: ProjectInfo[]) => {
  //     app.load(projectsList);
  //     ipcRenderer.send('show_window');
  //     wrapRender();
  //   }
  // );

  if ((module as any).hot) {
    (module as any).hot.accept(() => {
      console.log('HOT MODULE!!');
      wrapRender();
    });
  }
} catch (e) {
  console.error(e);
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
