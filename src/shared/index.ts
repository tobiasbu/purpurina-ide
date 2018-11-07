import { remote } from "electron";
import { UserInfo } from "./typings";

export function getUserInfo(): UserInfo {
    return remote.getGlobal('userInfo');
}



