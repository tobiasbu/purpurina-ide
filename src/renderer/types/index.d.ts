/// <reference path="DialogsApi.ts" />
/// <reference path="RendererApi.ts" />

import type { UserInfo } from '@shared/node/getUserInfo';

declare global {
  interface Window {
    userInfo: UserInfo;
    OS: {
      readonly MACOS: boolean;
      readonly WINDOWS: boolean;
      readonly LINUX: boolean;
    };
    dialogs: DialogsApi;
    project: ProjectApi;
    renderer: RendererApi;
  }
}
