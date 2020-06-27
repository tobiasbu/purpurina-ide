import * as os from 'os';
import { capitalizeFirst } from '@shared/utils/stringUtils';

export enum Platform {
  Windows = 1,
  Linux,
  MacOS,
  Other,
}

export interface UserInfo {
  homeDir: string;
  userName: string;
  platform: Platform;
  isPlatform(platformName: PlatformName): boolean;
}

export type PlatformName = 'macos' | 'windows' | 'linux' | 'other';

export default function getUserInfo() {
  const osUserInfo = os.userInfo();

  let plat: Platform;
  switch (os.platform()) {
    case 'darwin':
      plat = Platform.MacOS;
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
      const platform =
        platformName === 'macos'
          ? 'MacOS'
          : capitalizeFirst(platformName.toLowerCase());
      console.log(platform, Platform[platform], plat);
      return Platform[platform] === plat;
    },
  };

  Object.freeze(userInfo);
  return userInfo;
}
