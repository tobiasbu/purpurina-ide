import Application from "./core/Application";


if (process.env.NODE_ENV === 'production') {
    const sourceMapSupport = require('source-map-support'); // eslint-disable-line
    sourceMapSupport.install();
}

// function installExtensions { 
//     if (process.env.NODE_ENV === 'development') {
//       const installer = require('electron-devtools-installer'); // eslint-disable-line global-require
  
//       const extensions = [
//         'REACT_DEVELOPER_TOOLS',
//         'REDUX_DEVTOOLS'
//       ];
//       const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
//       return Promise.all(extensions.map(name => installer.default(installer[name], forceDownload)));
//     }
  
//     return Promise.resolve([]);
// } ;

if (process.env.NODE_ENV === 'development') {
    require('electron-debug')(); // eslint-disable-line global-require
    //const path = require('path'); // eslint-disable-line
    //const p = path.join(__dirname, '..', 'app', 'node_modules'); // eslint-disable-line
    //require('module').globalPaths.push(p); // eslint-disable-line
}
  
const AppControl = new Application();

export default AppControl;