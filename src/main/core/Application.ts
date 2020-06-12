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
    if (DEV_MODE) {
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
      if (isLaunching) {
        app.quit();
      }
    });
  }

  startLauncher(): Promise<BrowserWindow> {
    const promise = new Promise<BrowserWindow>((resolve, reject) => {
      const mainWindow = createStartupWindow();
      if (!mainWindow) {
        reject(new Error('"mainWindow" is not defined'));
      }
      this.window = mainWindow;

      mainWindow.on('ready-to-show', () => {
        this.appState = AppState.Launcher;
        resolve(mainWindow);
      });

      // did-finisdh-load
      // mainWindow.once('ready-to-show',
      //                 this.readyToShow.bind(this, resolve, mainWindow, AppState.Launcher));

      // events(this);

      Logger.log(`Opening ${APP_NAME} Launcher`);
      this.appState = AppState.InitializeLauncher;
    });

    return promise;
  }

  startEditor(): Promise<BrowserWindow> {
    const oldState = this.appState;
    this.appState = AppState.InitializeEditor;

    if (oldState === AppState.Launcher) {
      if (DEV_MODE) {
        this.window.webContents.closeDevTools();
      }
      this.window.close();
      this.window = null;
    }

    const promise = new Promise<BrowserWindow>((resolve, reject) => {
      const mainWindow = createEditorWindow();
      if (!mainWindow) {
        reject(new Error('"mainWindow" is not defined'));
      }
      this.window = mainWindow;

      mainWindow.once(
        'ready-to-show',
        this.readyToShow.bind(this, resolve, mainWindow, AppState.Editor)
      );
    });

    return promise;
  }
}
