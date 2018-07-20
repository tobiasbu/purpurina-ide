
import { app } from 'electron';
import { createMainWindow } from '../window/createMainWindow';
import registerEvents from '../events';


const path = require('path');


export default class Application {

    private mainWindow: Electron.BrowserWindow;

    get window() : Electron.BrowserWindow {
        return this.mainWindow;
    }

    constructor() {

        // app.on('ready', () => {
        //     this.window = new BrowserWindow({ center: true, darkTheme: true });
        //     this.window.loadURL('file://' + __dirname + '/index.html');

        //     this.window.on('closed', () => {
        //         this.window = null;
        //     });
        // });

        // app.on('window-all-closed', () => {
        //     app.quit();
        // });

        let self = this;
        //this.app.on('window-all-closed', this.onWindowAllClosed);

        app.on("ready", () => {
            const appPath = path.join('file://', __dirname, './dist/index.html')
            self.mainWindow = createMainWindow(appPath);
            registerEvents();

        });

        
        app.on("window-all-closed", app.quit);
        
    }

    // private onClose() {
    //     this.window = null;
    // }

    // private onWindowAllClosed() {
    //     if (process.platform !== 'win32') {
    //         this.app.quit();
    //     }
    // }

}