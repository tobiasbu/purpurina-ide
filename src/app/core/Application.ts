
import { app, BrowserWindow } from 'electron';
import { createStartupWindow, createEditorWindow } from './window';
import { createMainWindow } from '../window/createMainWindow';
import registerEvents from '../events';
import EditorSettings from './EditorSettings';

enum AppState {
    Uninitialized,
    InitializeLaucher,
    Laucher,
    InitializeEditor,
    Editor
}

const DEV_MODE = process.env.NODE_ENV === 'development';



export default class Application {

    private _mainWindow: Electron.BrowserWindow;
    private _state: AppState;
    settings: EditorSettings;

    get state(): AppState {
        return this._state;
    }

    get mainWindow(): Electron.BrowserWindow {
        return this._mainWindow;
    }

    constructor(editorSettings: EditorSettings) {
        this._mainWindow = null;
        this._state = AppState.Uninitialized;
        this.settings = editorSettings;
    }

    private readyToShow = (resolve, mainWindow: BrowserWindow, toState: AppState) => {
        mainWindow.show();
        mainWindow.focus();
        if (DEV_MODE) {
            mainWindow.webContents.openDevTools();
        }
        this._state = toState;
        resolve(mainWindow);
        console.log(this);
    }

    initialize() {
        app.on("window-all-closed", () => {
            const isLauching = this._state === AppState.Laucher ||
                this._state === AppState.InitializeLaucher ||
                this._state === AppState.Uninitialized;
            if (isLauching) {
                app.quit()
            }
        });
    }

    startLaucher() {
        const promise = new Promise<BrowserWindow>((resolve, reject) => {

            const mainWindow = createStartupWindow();
            if (!mainWindow) {
                reject(new Error('"mainWindow" is not defined'));
            }
            this._mainWindow = mainWindow;

            // did-finisdh-load
            mainWindow.once("ready-to-show", this.readyToShow.bind(this, resolve, mainWindow, AppState.Laucher));

            registerEvents(this);

            console.log('Starting Glitter Laucher')
            this._state = AppState.InitializeLaucher;

           
        });

        return promise;
    }

    startEditor() {
        const oldState = this._state;
        this._state = AppState.InitializeEditor;

        if (oldState === AppState.Laucher) {
            if (DEV_MODE) {
                this._mainWindow.webContents.closeDevTools();
            }
            this._mainWindow.close();
            this._mainWindow = null;
        }

        const promise = new Promise<BrowserWindow>((resolve, reject) => {

            const mainWindow = createEditorWindow();

            if (!mainWindow) {
                reject(new Error('"mainWindow" is not defined'));
            }

            this._mainWindow = mainWindow;

            mainWindow.once("ready-to-show", this.readyToShow.bind(this, resolve, mainWindow, AppState.Editor));

        });

        return promise;
    }


}