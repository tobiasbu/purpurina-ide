import { BrowserWindow } from 'electron';
import ContextWindow from './ContextWindow';

interface ContextWindowCreationOptions {}

export default class WindowService {
  private windows: ContextWindow[];
  create(options?: ContextWindowCreationOptions): ContextWindow {
    const browserWindow = new BrowserWindow();
    const window = new ContextWindow(browserWindow);
    this.windows.push(window);
    return window;
  }
}
