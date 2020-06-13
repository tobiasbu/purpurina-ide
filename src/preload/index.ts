// export function getUserInfo(): UserInfo {
//   return remote.getGlobal('userInfo');
// }

import { contextBridge, remote } from 'electron';
import { UserInfo } from '@shared/types';

// export function getPlatform() {
//   const userInfo = remote.getGlobal('userInfo') as UserInfo;
//   return userInfo.platform;
// }

// contextBridge.exposeInMainWorld('userInfo', {

// })

function init() {
  window.userInfo = remote.getGlobal('userInfo');
}

init();
