
import './style/style.css'
import App from "./App";
import { hyper } from 'hyperhtml';




let rootNode = document.getElementById('root');


hyper(rootNode)`${new App()}`;


