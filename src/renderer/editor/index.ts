(window as any).global = window;

(window as any).eval = global.eval = function () {
  throw new Error('Sorry, this app does not support window.eval().');
};

import './style/main.css';
// import SplashScreen from './components/SplashScreen';
import hyper from 'hyperhtml';
import App from './App';
import takeOverConsole from './log/takeOverConsole';
import LoggerMiddleware from './log/LoggerMiddleware';
// import { hyper } from 'hyperhtml';

const rootNode = document.getElementById('root');

takeOverConsole(LoggerMiddleware);

// hyper(rootNode)`${new SplashScreen()}`;
hyper(rootNode)`${new App()}`;

console.log('hi');
