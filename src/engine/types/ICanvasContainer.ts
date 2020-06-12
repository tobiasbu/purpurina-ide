/**
 * Container for canvas creation and pooling
 */
interface ICanvasContainer {
  /**
   * The canvas DOM element
   */
  canvas: HTMLCanvasElement;
  /**
   * Unique ID of this canvas
   */
  readonly id: string;
  /**
   * The original width
   */
  readonly initialWidth: number;
  /**
   * The original height
   */
  readonly initialHeight: number;
  using: boolean;
}

interface IColor {
  r: number;
  g: number;
  b: number;
  a?: number;
}
