
import { app, BrowserWindow } from 'electron';
import { createStartupWindow } from '../window';
import { createMainWindow } from '../window/createMainWindow';
import registerEvents from '../events';
import EditorSettings from './EditorSettings';

enum AppState {
    Uninitialized,
    Initialize,
    Laucher
}

export default class Application {

    private _mainWindow: Electron.BrowserWindow;
    state: AppState;
    settings: EditorSettings;

    get mainWindow(): Electron.BrowserWindow {
        return this._mainWindow;
    }

    constructor(editorSettings: EditorSettings) {
        this._mainWindow = null;
        this.settings = editorSettings;
    }

    async initialize() {
        let promise = new Promise<BrowserWindow>((resolve, reject) => {

            const readyToShow = (mainWindow: BrowserWindow) => {

                mainWindow.show();
                mainWindow.focus();
                mainWindow.webContents.openDevTools();
                this.state = AppState.Laucher;
                resolve(mainWindow);
            }

            const startupFn = () => {
                const mainWindow = createStartupWindow();

                if (!mainWindow) {
                    reject(new Error('"mainWindow" is not defined'));
                }

                this._mainWindow = mainWindow;

                // did-finisdh-load
                mainWindow.once("ready-to-show", readyToShow.bind(this, mainWindow));

                registerEvents(this);
            }

            this.state = AppState.Initialize;

            app.once("ready", startupFn);

            app.on("window-all-closed", app.quit);
        });

        return promise;
    }


}