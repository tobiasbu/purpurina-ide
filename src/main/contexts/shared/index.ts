import getUserInfo from '@shared/node/getUserInfo';
import type { ContextHandlers } from '@main/contextualizer';

import sharedIpcApis from '../../bridgeApis/sharedIpcApis';

function shared(handlers: ContextHandlers) {
  const userInfo = getUserInfo();
  sharedIpcApis(handlers.ipc());
  return {
    userInfo,
  };
}

module.exports = shared;
