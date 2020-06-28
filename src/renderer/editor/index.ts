(window as any).global = window;

(window as any).eval = global.eval = function () {
  throw new Error('Sorry, this app does not support window.eval().');
};

import hyper from 'hyperhtml';

import './style/main.css';
import takeOverConsole from './log/takeOverConsole';
import LoggerMiddleware from './log/LoggerMiddleware';

import App from './App';


takeOverConsole(LoggerMiddleware);

const rootNode = document.getElementById('root');
hyper(rootNode)`${new App()}`;

window.browserWindow.show();
