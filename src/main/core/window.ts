import { BrowserWindow } from 'electron';
import * as url from 'url';

import version from '@shared/version';
import Logger from '@main/logger';

const MIN_WIDTH = 640;
const MIN_HEIGHT = 480;

function getURL(pathName: 'editor' | 'launcher'): string {
  let uo: url.UrlObject;
  Logger.log(process.env.ELECTRON_WEBPACK_WDS_PORT);
  if (process.env.development) {
    uo = {
      protocol: 'http',
      hostname: 'localhost',
      port: process.env.ELECTRON_WEBPACK_WDS_PORT,
      pathname: `/renderer/${pathName}/`,
    };
  } else {
    // TODO
    uo = {};
  }
  return url.format(uo);
}

/**
 * Creates the main window.
 *
 * @param appPath The path to the bundle root.
 * @param showDelay How long in ms before showing the window after the renderer is ready.
 * @return The startup window.
 */
export function createStartupWindow(): BrowserWindow {
  const width = 800;
  const height = 450 + 80;
  const launcherPath = getURL('launcher');

  const IS_DEV = process.env.NODE_ENV === 'development';

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
    transparent: false,
    title: `Purpurina Editor v${version.toString()}`,
    webPreferences: {
      nodeIntegration: process.env.NODE_ENV === 'development',
      backgroundThrottling: false,
      textAreasAreResizable: false,
      additionalArguments: IS_DEV ? ['DEVELOPMENT'] : [],
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

  window.webContents.on('will-navigate', (ev) => {
    ev.preventDefault();
  });

  window.on('close', () => {
    window = null;
  });

  // load entry html page in the renderer.
  window.loadURL(launcherPath);

  return window;
}

export function createEditorWindow(): BrowserWindow {
  const editorPath = getURL('editor');
  // const basePath = path.join('file://', __dirname);
  // const editorPath = path.join(basePath, 'editor/index.html');

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
      webSecurity: true,
      nodeIntegration: process.env.NODE_ENV === 'development',
    },
  });
  window.on('close', () => {
    window = null;
  });
  window.setMenu(null);

  window.loadURL(editorPath);
  // window.maximize();

  return window;
}
