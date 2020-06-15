import { UserInfo } from '@shared/node/getUserInfo';

interface RendererDialogsAPI {
  /**
   * Open directory dialog.
   * @returns
   * `false` if the dialog was cancelled
   * `string` the selected path
   */
  openDirectory(
    options?: DialogsAPI.OpenDirectoryOptions
  ): Promise<string | undefined | false>;
}

declare global {
  interface Window {
    userInfo: UserInfo;
    OS: {
      readonly MACOS: boolean;
      readonly WINDOWS: boolean;
      readonly LINUX: boolean;
    };
    dialogs: RendererDialogsAPI;
  }
}
