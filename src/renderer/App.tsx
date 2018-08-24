import * as React from "react";
//import * as logo from './logo.svg';

//import { ipcRenderer } from "electron";

//import GoldenLayoutContainer from "./layout/GoldenLayoutContainer";
//import mainLayoutConfig from './layout/mainLayoutConfig';
import './widgets/game/style.css'
import Toolbar from "./components/Toolbar";
import StatusBar from "./components/StatusBar";
import WorkspacePanel from "./widgets/workspace/WorkspacePanel";

//console.log(process)

export default class App extends React.Component {

  // private test(event: React.MouseEvent<HTMLButtonElement>) {
  //   ipcRenderer.send("build");
  // }
  componentWillMount() {   
  }

  render() {

    return (
      <div id="App" >
        <Toolbar />
        <WorkspacePanel/>
        <StatusBar />
      </div>
    );
  }
  // render() {
  //   return (
  //     // <div className="App">
  //     //   <header className="App-header">
  //     //     <img src={logo} className="App-logo" alt="logo" />
  //     //     <h1 className="App-title">Welcome to React</h1>
  //     //   </header>
  //     //   <p className="App-intro">
  //     //     To get started, edit <code>src/App.js</code> and save to reload.
  //     //   </p>
  //     //   <button className="build" onClick={e => this.test(e)}>TEST</button>

  //     // </div>

  //   );
  // }
}


