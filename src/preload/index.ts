import getUserInfo from '@shared/node/getUserInfo';

import expose from './expose';
import exposeDialogsIPC from './exposeDialogsIPC';
import exposeProjectIPC from './exposeProjectIPC';
import exposeBrowserWindowIPC from './exposeBrowserWindowIPC';
import exposeAssetsIPC from './exposeAssetsIPC';

function init() {
  const userInfo = getUserInfo();
  expose('OS', {
    MACOS: userInfo.isPlatform('macos'),
    WINDOWS: userInfo.isPlatform('windows'),
    LINUX: userInfo.isPlatform('linux'),
  });
  expose('userInfo', userInfo);

  exposeProjectIPC();
  exposeAssetsIPC();
  exposeDialogsIPC();
  exposeBrowserWindowIPC();
}

init();
