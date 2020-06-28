/**
 * Exposes bridge functionalities between main and renderer process.
 */
interface BrowserWindowIPC {
  /**
   * Asks to main process to show window.
   */
  show(): Promise<boolean>;
  /**
   * Sends to main process that the window is ready to show
   */
  ready(): Promise<any>;
  minimize();
  close();
}
