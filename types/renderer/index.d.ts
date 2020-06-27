/// <reference path="DialogsIPC.ts" />
/// <reference path="BrowserWindowIPC.ts" />

import { UserInfo } from '@shared/node/getUserInfo';

interface OS {
  readonly MACOS: boolean;
  readonly WINDOWS: boolean;
  readonly LINUX: boolean;
}

declare global {
  interface Window {
    userInfo: UserInfo;
    OS: OS;

    // IPC APIS
    dialogs: DialogsIPC;
    project: ProjectIPC;
    browserWindow: BrowserWindowIPC;
    assets: any;
  }
}
