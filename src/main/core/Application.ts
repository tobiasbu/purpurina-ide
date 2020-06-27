import { app, BrowserWindow } from 'electron';

import Logger from 'main/logger';

import { createStartupWindow, createEditorWindow } from './window';
// import events from '../events';
import EditorSettings from './EditorSettings';

enum AppState {
  Uninitialized,
  InitializeLauncher,
  Launcher,
  InitializeEditor,
  Editor,
}

let doNotExit = true;

const DEV_MODE = process.env.NODE_ENV === 'development';
const APP_NAME = 'Purpurina';

export default class Application {
  private window: Electron.BrowserWindow;
  private appState: AppState;
  settings: EditorSettings;

  get state(): AppState {
    return this.appState;
  }

  get mainWindow(): Electron.BrowserWindow {
    return this.window;
  }

  constructor(editorSettings: EditorSettings) {
    this.window = null;
    this.appState = AppState.Uninitialized;
    this.settings = editorSettings;
  }

  private readyToShow = (
    resolve: (win: BrowserWindow) => void,
    mainWindow: BrowserWindow,
    toState: AppState
  ): void => {
    mainWindow.show();
    mainWindow.focus();
    if (__PURPUR_DEV__) {
      mainWindow.webContents.openDevTools();
    }
    this.appState = toState;
    resolve(mainWindow);
  };

  initialize(): void {
    Logger.log(`Initializing ${APP_NAME}`);
    app.on('window-all-closed', () => {
      const isLaunching =
        this.appState === AppState.Launcher ||
        this.appState === AppState.InitializeLauncher ||
        this.appState === AppState.Uninitialized;

      if (!doNotExit) {
        app.quit();
      }

      // app.quit();
      // on macOS it is common for applications to stay open until the user explicitly quits
      if (process.platform !== 'darwin') {
      }
    });
  }
  startLauncher(): Promise<BrowserWindow> {
    const promise = new Promise<BrowserWindow>((resolve, reject) => {
      let mainWindow = createStartupWindow();
      if (!mainWindow) {
        reject(new Error('"mainWindow" is not defined'));
        return;
      }
      this.window = mainWindow;

      const self = this;
      this.appState = AppState.InitializeLauncher;

      mainWindow.once('ready-to-show', () => {
        Logger.log(`Opening ${APP_NAME} Launcher`);
      });

      app.on('activate', () => {
        // on macOS it is common to re-create a window even after all windows have been closed
        // if (mainWindow === null) {
        //   mainWindow = createStartupWindow();
        //   this.window = mainWindow;
        //   self.appState = AppState.Launcher;
        //   // mainWindow = createMainWindow()
        // }
      });

      self.appState = AppState.Launcher;
      resolve(mainWindow);

      // did-finisdh-load
      // mainWindow.once('ready-to-show',
      //                 this.readyToShow.bind(this, resolve, mainWindow, AppState.Launcher));

      // events(this);
    });

    return promise;
  }

  startEditor(): Promise<BrowserWindow> {
    const oldState = this.appState;
    this.appState = AppState.InitializeEditor;
    doNotExit = true;
    if (oldState === AppState.Launcher) {
      if (__PURPUR_DEV__) {
        this.window.webContents.closeDevTools();
      }
      this.window.close();
      this.window = null;
    }

    const promise = new Promise<BrowserWindow>((resolve, reject) => {
      const editorWindow = createEditorWindow();
      if (!editorWindow) {
        reject(new Error('"editorWindow" is not defined'));
      }
      this.window = editorWindow;

      editorWindow.once('close', () => {
        app.exit();
      });

      editorWindow.once('ready-to-show', () => {
        this.readyToShow(resolve, editorWindow, AppState.Editor);
        console.log(this.appState);
        doNotExit = false;
      });
    });

    return promise;
  }
}
