// export function getUserInfo(): UserInfo {
//   return remote.getGlobal('userInfo');
// }

import * as os from 'os';
import * as electron from 'electron';
import { UserInfo, Platform } from '@shared/types';

export default function initializeGlobal() {
  const osUserInfo = os.userInfo();

  let plat: Platform;
  switch (os.platform()) {
    case 'darwin':
      plat = Platform.Mac;
      break;
    case 'win32':
      plat = Platform.Windows;
      break;
    case 'linux':
      plat = Platform.Linux;
      break;
    default:
      plat = Platform.Other;
      break;
  }

  const userInfo: UserInfo = {
    homeDir: osUserInfo.homedir,
    userName: osUserInfo.username,
    platform: plat,
  };

  Object.freeze(userInfo);
  return userInfo;
}

// export function getPlatform() {
//   const userInfo = remote.getGlobal('userInfo') as UserInfo;
//   return userInfo.platform;
// }

// contextBridge.exposeInMainWorld('userInfo', {

// })

function init() {
  console.log(electron);
  window.userInfo = initializeGlobal();
}

init();
