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

document.addEventListener('dragstart', (event) => event.preventDefault());
document.addEventListener('dragover', (event) => event.preventDefault());
document.addEventListener('drop', (event) => event.preventDefault());

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

const app = new App();
const wrapRender = (): HTMLElement => {
  const mainEl = app.render();
  return mainEl;
};

const root = document.getElementById('root');
hyper.bind(root)`${wrapRender}`;

try {
  window.browserWindow.ready().then((projects) => {
    app.load(projects);
    wrapRender();
    window.browserWindow.show();
  });

  if ((module as any).hot) {
    (module as any).hot.accept(() => {
      wrapRender();
    });
  }
} catch (e) {
  console.error(e);
}
