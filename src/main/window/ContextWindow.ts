import { BrowserWindow } from 'electron';

/**
 * Represents browser window manager
 */
export default class ContextWindow {
  private readonly browserWindow: BrowserWindow;
  constructor(browserWindow: BrowserWindow) {
    this.browserWindow = browserWindow;
  }
}
