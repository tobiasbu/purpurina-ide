// export function getUserInfo(): UserInfo {
//   return remote.getGlobal('userInfo');
// }

import getUserInfo from '@shared/node/getUserInfo';
import createDialogsHelpers from './createDialogsHelpers';
import expose from './expose';

//   const userInfo = remote.getGlobal('userInfo') as UserInfo;
//   return userInfo.platform;
// }

// contextBridge.exposeInMainWorld('userInfo', {

// })

function init() {
  const userInfo = getUserInfo();
  expose('OS', {
    MACOS: userInfo.isPlatform('mac'),
    WINDOWS: userInfo.isPlatform('windows'),
    LINUX: userInfo.isPlatform('linux'),
  });
  expose('userInfo', userInfo);

  createDialogsHelpers();
}

init();
