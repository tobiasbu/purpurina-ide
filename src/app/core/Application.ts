
import { app } from 'electron';
import { createStartupWindow } from '../window';
import { createMainWindow } from '../window/createMainWindow';
import registerEvents from '../events';


export default class Application {

    private _mainWindow: Electron.BrowserWindow;

    get mainWindow(): Electron.BrowserWindow {
        return this._mainWindow;
    }

    constructor() {
   
        this._mainWindow = null;
        //this.app.on('window-all-closed', this.onWindowAllClosed);

        
    }

    initialize() {

        app.on("ready", async () => {
            // console.log(__dirname)
            // const appPath = path.join('file://', __dirname, './index.html')
            // // const mainWindow = createMainWindow(appPath);
            const mainWindow = createStartupWindow();
            

            mainWindow.webContents.on("did-finish-load", () => {

                if (!mainWindow) {
                    throw new Error('"mainWindow" is not defined');
                }
        
                 setTimeout(() => {
                    mainWindow.show()
                    mainWindow.focus()
                 }, 100);
            })


            mainWindow.webContents.openDevTools();

            this._mainWindow = mainWindow;
            //createStartupWindow();
            registerEvents();

        });

        app.on("window-all-closed", app.quit);

    }


}