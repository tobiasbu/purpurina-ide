import * as React from "react";
//import * as logo from './logo.svg';

//import { ipcRenderer } from "electron";

//import GoldenLayoutContainer from "./layout/GoldenLayoutContainer";
//import mainLayoutConfig from './layout/mainLayoutConfig';
import './style/style.css'
import Toolbar from "./components/Toolbar";
import StatusBar from "./components/StatusBar";
import WorkspacePanel from "./widgets/workspace/WorkspacePanel";

//console.log(process)

const t :React.CSSProperties = {

}

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

}


