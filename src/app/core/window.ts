import { BrowserWindow } from 'electron';
import version from '../version';
import * as path from 'path';

const MIN_WIDTH = 640;
const MIN_HEIGHT = 480;

/**
 * Creates the main window.
 *
 * @param appPath The path to the bundle root.
 * @param showDelay How long in ms before showing the window after the renderer is ready.
 * @return The startup window.
 */
export function createStartupWindow(): BrowserWindow {

  const width = 1024;
  const height = 576;
  const basePath = path.join('file://', __dirname);
  const launcherPath = path.join(basePath, '../src/renderer/launcher/index.html');
  // const preloadPath = path.join(__dirname, '../src/app/preload.js');

  // create our main window
  let window = new BrowserWindow({
    width,
    height,
    minWidth: width,
    minHeight: height,
    maximizable: false,
    show: false,
    useContentSize: true,
    center: true,
    backgroundColor: '#080808',
    vibrancy: 'dark',
    transparent: false,
    title: `Purpurina Editor v${version.toString()}`,
    darkTheme: true,
    webPreferences: {
      nodeIntegration: (process.env.NODE_ENV === 'development'),
      backgroundThrottling: false,
      textAreasAreResizable: false,
      // preload: path.join(__dirname, 'preload.js'),
      // contextIsolation: true,
      // nodeIntegration: false,
      // preload: preloadPath,
    },
    resizable: false,
    frame: false,
    enableLargerThanScreen: false,
    fullscreenable: false,
  });

  window.webContents.on('will-navigate', ev => {
    ev.preventDefault();
  });

  window.on('close', () => window = null);

  // load entry html page in the renderer.
  window.loadURL(launcherPath);

  return window;
}

export function createEditorWindow(): BrowserWindow {

  const basePath = path.join('file://', __dirname);
  const editorPath = path.join(basePath, 'editor/index.html');

  let window = new BrowserWindow({
    minWidth: MIN_WIDTH,
    minHeight: MIN_HEIGHT,
    width: MIN_WIDTH,
    height: MIN_HEIGHT,
    maximizable: true,
    backgroundColor: '#080808',
    show: false,
    center: true,
    darkTheme: true,
    title: 'Scintilla Editor',
    enableLargerThanScreen: true,
    resizable: true,
    webPreferences: {
      // textAreasAreResizable: false,

      nodeIntegration: (process.env.NODE_ENV === 'development'),
    },
  });

  window.on('close', () => window = null);
  window.setMenu(null);

  window.loadURL(editorPath);
  // window.maximize();

  return window;

}
