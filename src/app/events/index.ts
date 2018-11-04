import { ipcMain, dialog, BrowserWindow } from "electron";
import AppControl from "..";

export default function registerEvents () {

    ipcMain.on("build", () => {

        const options: Electron.MessageBoxOptions = {
            title: "teste",
            buttons: ['OK'],
            message: "Hello World!",

        }
        
       dialog.showMessageBox(AppControl.mainWindow, options);
    
    
    });

    ipcMain.on("selectDirectory", (caller: BrowserWindow) => {

        

        dialog.showOpenDialog(caller, {
            properties: ['openDirectory', 'createDirectory']
        });

    });

}

