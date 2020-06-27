import hyper from 'hyperhtml';

// import * as logo from './logo.svg';
// import Toolbar from "./components/Toolbar";
// import StatusBar from "./components/StatusBar";
import Workspace from './ui/workspace/Workspace';


export default class App extends hyper.Component {
  private workspace: Workspace;

  constructor() {
    super();
    this.workspace = new Workspace();
  }

  render() {
    return hyper.wire(this)`
    <div class='toolbar'/>
      ${this.workspace.element}
    <div class='statusbar'/>`;
  }
}
