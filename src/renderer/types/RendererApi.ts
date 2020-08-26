/**
 * Exposes bridge functionalities between main and renderer process.
 */
interface RendererApi {
  /**
   * Asks to main process to show window.
   */
  show(): Promise<boolean>;
  /**
   * Sends to main process that the window is ready to show
   */
  ready(): Promise<any>;
}
