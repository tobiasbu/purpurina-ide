import { remote } from "electron";





const Dialogs = {


    openDirectoryDialog(defaultPath?: string) {

        const currentWindow = remote.getCurrentWindow();

        const path = remote.dialog.showOpenDialog(currentWindow, {
            properties: ['createDirectory', 'openDirectory'],
            defaultPath
        })
    
        if (path) {
            return path[0];
        } 
    
        return null;
    }
    
}

export default Dialogs;