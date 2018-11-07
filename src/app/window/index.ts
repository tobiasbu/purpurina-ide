import { app, BrowserWindow } from "electron";
import version from "../version";

import * as path from 'path';
import * as fs from 'fs';

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
    const basePath = path.join('file://', __dirname)
    const appPath =  path.join(basePath, '../src/laucher/index.html');

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
        backgroundColor: '#000',
        vibrancy: "dark",
        transparent: false,
        title: 'Scintilla Editor v' + version.toString(),
        webPreferences: {
            //nodeIntegration: false,
            backgroundThrottling: false,
            textAreasAreResizable: false,
            preload: path.join(__dirname, 'preload.js'),
            // contextIsolation: true,
        },
        resizable: false,
        frame: false,
        enableLargerThanScreen: false,
    });

    window.webContents.on('will-navigate', ev => {
        ev.preventDefault()
    })


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