
import { app, BrowserWindow } from 'electron';
import { createStartupWindow, createEditorWindow } from './window';
import events from '../events';
import EditorSettings from './EditorSettings';

enum AppState {
  Uninitialized,
  InitializeLauncher,
  Launcher,
  InitializeEditor,
  Editor,
}

const DEV_MODE = process.env.NODE_ENV === 'development';

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

  private readyToShow = (resolve, mainWindow: BrowserWindow, toState: AppState) => {
    mainWindow.show();
    mainWindow.focus();
    if (DEV_MODE) {
      mainWindow.webContents.openDevTools();
    }
    this.appState = toState;
    resolve(mainWindow);
  }

  initialize() {
    console.log('Initializing Purpurina');

    app.on('window-all-closed', () => {
      const isLaunching = this.appState === AppState.Launcher ||
        this.appState === AppState.InitializeLauncher ||
        this.appState === AppState.Uninitialized;
      if (isLaunching) {
        app.quit();
      }
    });
  }

  startLauncher() {
    const promise = new Promise<BrowserWindow>((resolve, reject) => {

      const mainWindow = createStartupWindow();
      if (!mainWindow) {
        reject(new Error('"mainWindow" is not defined'));
      }
      this.window = mainWindow;

      // did-finisdh-load
      mainWindow.once('ready-to-show',
                      this.readyToShow.bind(this, resolve, mainWindow, AppState.Launcher));

      events(this);

      console.log('Starting Glitter Launcher');
      this.appState = AppState.InitializeLauncher;

    });

    return promise;
  }

  startEditor() {
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

      mainWindow.once('ready-to-show', this.readyToShow.bind(this,
                                                             resolve, mainWindow, AppState.Editor));

    });

    return promise;
  }
}
