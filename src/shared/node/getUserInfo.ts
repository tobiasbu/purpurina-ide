import * as os from 'os';
import { capitalizeFirst } from '@shared/utils/stringUtils';

export enum Platform {
  Windows,
  Mac,
  Linux,
  Other,
}

export interface UserInfo {
  homeDir: string;
  userName: string;
  platform: Platform;
  isPlatform(platformName: PlatformName): boolean;
}

export type PlatformName = 'mac' | 'windows' | 'linux' | 'other';

export default function getUserInfo() {
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
    isPlatform: function (platformName: PlatformName) {
      const platform = capitalizeFirst(platformName);
      return Platform[platform] === plat;
    },
  };

  Object.freeze(userInfo);
  return userInfo;
}
