import Color from '../render/color/Color';
import { RenderingType, ContextID } from './RendererProperties';

/**
 * Interface for renderer context
 */
export default interface IRenderer {
  /**
   * If the renderer is double buffered.
   */
  readonly doubleBuffer: boolean;

  /**
   * Type of renderer context '2d' or 'webgl'
   */
  readonly renderContext: ContextID;

  /*
   * The buffer rendering canvas DOM element.
   * This property is only available if the renderer is set to double buffered
   * otherwise return the DOM canvas.
   */
  //readonly canvasBuffer: HTMLCanvasElement;

  /**
   * The DOM canvas reference
   */
  readonly canvas: HTMLCanvasElement;

  /**
   * The drawing context
   */
  readonly context: CanvasRenderingContext2D | WebGLRenderingContext;

  /**
   * Width of the renderer
   */
  readonly width: number;

  /**
   * Height of the renderer
   */
  readonly height: number;

  /**
   * The canvas background color
   */
  backgroundColor: Color;

  /**
   * The global alpha level of the canvas
   */
  alpha: number;

  /**
   * The rendering type of the canvas.
   *
   *  Note:
   *
   *  For pixelated effect turn this option to RenderingType.NEAREST
   *  otherwise to RenderingType.LINEAR.
   */
  renderingType: RenderingType;

  // interpolation: InterpolationType;

  /**
   * The number of draw calls
   */
  readonly drawCalls: number;

  /**
   * Resizes the canvas element
   * @param width New width of the canvas element
   * @param height New height of the canvas element
   */
  resize(width: number, height: number);

  //repaint();
}
