import getUserInfo from '@shared/node/getUserInfo';

import expose from './expose';
import exposeDialogsAPI from './exposeDialogsAPI';
import exposeProjectAPI from './exposeProjectAPI';
import exposeRendererAPI from './exposeRendererAPI';

function init() {
  const userInfo = getUserInfo();
  expose('OS', {
    MACOS: userInfo.isPlatform('macos'),
    WINDOWS: userInfo.isPlatform('windows'),
    LINUX: userInfo.isPlatform('linux'),
  });
  expose('userInfo', userInfo);

  exposeProjectAPI();
  exposeDialogsAPI();
  exposeRendererAPI();
}

init();
