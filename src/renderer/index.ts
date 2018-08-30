
import DOM from "./dom";
import './style/style.css'
import { DockPanel } from "@phosphor/widgets";

// import * as React from "react";
// import * as ReactDOM from "react-dom";
// import { Provider } from "react-redux";

// // import './index.css';
// import store from './state/store';
// import App from './App';
// //import registerServiceWorker from './registerServiceWorker';

const rootNode = document.getElementById('root');

const toolbar = DOM.createElement('div',{class:'toolbar'});
const statusbar = DOM.createElement('div',{class:'statusbar'});
const dockpanel = new DockPanel();
dockpanel.id = 'main';



rootNode.appendChild(toolbar);
DockPanel.attach(dockpanel,rootNode);
rootNode.appendChild(statusbar);

// const appNode: JSX.Element = (
//     <Provider store={store}>
//         <App />
//     </Provider>
// );

// ReactDOM.render(appNode, rootNode);
// //registerServiceWorker();


