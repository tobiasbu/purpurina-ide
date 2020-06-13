import { UserInfo } from '@shared/types';

declare global {
  interface Window {
    userInfo: UserInfo;
  }
}
