/// <reference path="DialogsAPI.ts" />
/// <reference path="RendererAPI.ts" />

import { UserInfo } from '@shared/node/getUserInfo';

declare global {
  interface Window {
    userInfo: UserInfo;
    OS: {
      readonly MACOS: boolean;
      readonly WINDOWS: boolean;
      readonly LINUX: boolean;
    };
    dialogs: DialogsAPI;
    project: ProjectAPI;
    renderer: RendererAPI;
  }
}
