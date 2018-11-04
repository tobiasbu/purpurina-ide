import { remote } from "electron";

const currentWindow = remote.getCurrentWindow();

export function getUserInfo(): UserInfo {
    return remote.getGlobal('userInfo');
}

export function openDirectoryDialog(defaultPath?: string) {

    console.log(defaultPath)

    const path = remote.dialog.showOpenDialog(currentWindow, {
        properties: ['createDirectory', 'openDirectory'],
        defaultPath
    })

    if (path) {
        return path[0];
    } 

    return null;
}


