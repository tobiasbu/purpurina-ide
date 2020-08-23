import type { UserInfo } from '@shared/node/getUserInfo';

declare global {
  namespace NodeJS {
    interface Global {
      userInfo: UserInfo;
      __PURPUR_DEV__: boolean;
    }
  }
}
