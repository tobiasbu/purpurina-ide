import { app, BrowserWindow } from "electron";
import version from "../version";

import * as path from 'path';

/**
 * Creates the main window.
 *
 * @param appPath The path to the bundle root.
 * @param showDelay How long in ms before showing the window after the renderer is ready.
 * @return The startup window.
 */
export function createStartupWindow() {

    const width = 1024;
    const height = 576;
    const appPath =  path.join('file://', __dirname, '../src/laucher/index.html');

    // create our main window
    const window = new BrowserWindow({
        minWidth: width,
        minHeight: height,
        width: width,
        height: height,
        maximizable: false,
        show: false,
        useContentSize: true,
        center: true,
        //titleBarStyle: "hidden-inset",
        // backgroundColor: '#fff',
        vibrancy: "light",
        transparent: false,
        title: 'Scintilla v' + version.VERSION,
        webPreferences: {
            // nodeIntegration: false,
            backgroundThrottling: false,
            textAreasAreResizable: false,
        },
        resizable: false,
        frame: false,
    });

    // window.on('closed', () => {window = null;});
    
    // load entry html page in the renderer.
    window.loadURL(appPath);

    // only appear once we've loaded
    // window.webContents.on("did-finish-load", () => {
    //     setTimeout(() => {
    //         window.show()
    //         window.focus()
    //     }, 100)
    // })

    return window;



}