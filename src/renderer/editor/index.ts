
(window as any).global = window;

(window as any).eval = global.eval = function () {
    throw new Error(`Sorry, this app does not support window.eval().`)
}

// import './style/main.css';
// import App from "./App";
// import { hyper } from 'hyperhtml';




// const rootNode = document.getElementById('root');


// hyper(rootNode)`${new App()}`;
