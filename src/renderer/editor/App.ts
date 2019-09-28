// import * as React from "react";
// import * as logo from './logo.svg';

// import { ipcRenderer } from "electron";

// import GoldenLayoutContainer from "./layout/GoldenLayoutContainer";
// import mainLayoutConfig from './layout/mainLayoutConfig';

import hyper from 'hyperhtml';
// import Toolbar from "./components/Toolbar";
// import StatusBar from "./components/StatusBar";
import WorkspacePanel from './ui/workspace/WorkspacePanel';

// console.log(process)

export default class App extends hyper.Component {

  private workspace: WorkspacePanel;

  constructor() {
    super();
    this.workspace = new WorkspacePanel();

  }

  render() {
    return hyper.wire(this)`
    <div class='toolbar'/>
      ${this.workspace.element}
    <div class='statusbar'/>`;

  }
}

// export default class App extends React.Component {

//   // private test(event: React.MouseEvent<HTMLButtonElement>) {
//   //   ipcRenderer.send("build");
//   // }
//   componentWillMount() {
//   }

//   render() {

//     return (

//       // <div id="App" >
//       //   <Toolbar />
//       //   <WorkspacePanel/>
//       //   <StatusBar />
//       // </div>
//     );
//   }

// }
