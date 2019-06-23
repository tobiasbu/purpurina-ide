
(window as any).global = window;

(window as any).eval = global.eval = function () {
  throw new Error('Sorry, this app does not support window.eval().');
};

import MenuControl from './MenuControl';
import { remote, ipcRenderer } from 'electron';

document.addEventListener('dragstart', event => event.preventDefault());
document.addEventListener('dragover', event => event.preventDefault());
document.addEventListener('drop', event => event.preventDefault());

document.getElementById('close').onclick = () => {
  remote.getCurrentWindow().close();
};

/**
 * Register Menu Buttons
 */
let menu: MenuControl;

window.onload = () => {

  menu = new MenuControl();

  ipcRenderer.send('launcher_loaded');

  ipcRenderer.once('projects-loaded', (event: Electron.Event, projectsList: any) => {
    menu.init(projectsList);
  });

    // new Promise<IProjectInfo[]>((resolve) => {

    //     const projects: IProjectInfo[] = [];

    //     for (let i = 0; i < 20; i++) {
    //         projects.push({
    //             name: 'Hello',
    //             path: 'C:/Users/Admin/Documents',
    //             version: '0.0.1',
    //         })
    //     }

    //     resolve(projects);

    // }).then((projectsList) => {
    //     menu.init(projectsList);
    // })
};

// const contentNode = document.getElementById('content');

// p.then(function (projectsList)  {
//     hyper(contentNode)`${projectsList}`
// }).catch((e) => {
//     throw e;
// })
