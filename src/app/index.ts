import Application from "./core/Application";
import * as path from 'path';
import * as os from 'os';


const osUserInfo = os.userInfo();

const userInfo:UserInfo = {
    homeDir: osUserInfo.homedir,
    userName: osUserInfo.username
};



(global as any).userInfo = userInfo;




if (process.env.NODE_ENV === 'production') {
    const sourceMapSupport = require('source-map-support'); // eslint-disable-line
    sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true') {
        
    // require('electron-debug')();
    // const path = require('path');
    // const p = path.join(__dirname, '..', 'app', 'node_modules');
    // require('module').globalPaths.push(p);
}

// const installExtensions = async () => {
//     const installer = require('electron-devtools-installer');
//     const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
//     const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];
//     return Promise.all(
//         extensions.map(name => installer.default(installer[name], forceDownload))
//     ).catch(console.log);
// };


const AppControl = new Application();

AppControl.initialize();

export default AppControl;