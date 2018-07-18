
import { BrowserWindow } from 'electron';
const path = require('path');

export default class Application {

    private window: Electron.BrowserWindow;
    private app: Electron.App;

    constructor(app: Electron.App, options?: Electron.BrowserWindowConstructorOptions) {

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

        this.app = app;
        this.app.on('window-all-closed', this.onWindowAllClosed);
        this.app.on('ready', () => {this.onReady(options)});
    }

    private onClose() {
        this.window = null;
    }

    private onWindowAllClosed() {
        if (process.platform !== 'win32') {
            this.app.quit();
        }
    }

    private onReady(options?: Electron.BrowserWindowConstructorOptions) {
        this.window = new BrowserWindow(options);
        const modalPath = path.join('file://', __dirname, '/index.html')
        this.window.loadURL(modalPath);
        this.window.on('closed', this.onClose);
    }
}