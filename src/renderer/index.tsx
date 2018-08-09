import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import './index.css';
import store from './state/store';
import App from './App';
//import registerServiceWorker from './registerServiceWorker';

const rootNode = document.getElementById('root');

const appNode: JSX.Element = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(appNode, rootNode);
//registerServiceWorker();

