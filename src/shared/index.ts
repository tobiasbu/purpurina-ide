import { remote } from 'electron';
// import { UserInfo } from './types';

export function getUserInfo(): UserInfo {
  return remote.getGlobal('userInfo');
}
