import { ipcMain, dialog } from "electron";
import AppControl from "..";

export default function registerEvents () {

    ipcMain.on("build", () => {

        const options: Electron.MessageBoxOptions = {
            title: "teste",
            buttons: ['OK'],
            message: "Hello World!",

        }
        
       dialog.showMessageBox(AppControl.window, options);
    
    
    });

}

