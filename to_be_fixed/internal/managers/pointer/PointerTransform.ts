import MathUtils from '../../../../engine/math/MathUtils';
import Rect from '../../../../engine/math/Rect';

/**
 * Helper class that transforms global position to local Element position
 */
export default class PointerTransform {

  private element: HTMLElement;
  private clientRect: Rect;
  private boundingClientRect: ClientRect | DOMRect;
  private scale: IVector2;

  /**
   * Constructor
   * @param element Target element
   */
  constructor(element: HTMLElement) {
    this.element = element;
    this.clientRect = new Rect();
    this.boundingClientRect = null;
    this.updateClientRect();
  }

  /**
   * Update the client rect.
   * This function should be called when the target element is resized.
   */
  updateClientRect(): void {

    let rect = this.clientRect;
    let clientRect = this.element.getBoundingClientRect();
    this.boundingClientRect = clientRect;

    rect.x = clientRect.left + window.pageXOffset - document.documentElement.clientLeft;
    rect.y = clientRect.top + window.pageYOffset - document.documentElement.clientTop;
    rect.width = clientRect.width;
    rect.height = clientRect.height;
  }

  /**
   * Transform global position to local target position
   * @param position
   * @returns Local position of target
   */
  transform(position: IVector2): IVector2 {
    let rect = this.boundingClientRect;
    let pos = { x: 0, y: 0 };
    pos.x = MathUtils.floor((position.x - rect.left) / (rect.right - rect.left) * this.element.clientWidth);
    pos.y = MathUtils.floor((position.y - rect.top) / (rect.bottom - rect.top) * this.element.clientHeight);
    return pos;
  }

  /**
   * Transform global x position to local target x
   * @param x 
   * @returns Local 'x'
   */
  transformX(x: number): number {
    let rect = this.boundingClientRect;
    return MathUtils.floor((x - rect.left) / (rect.right - rect.left) * this.element.clientWidth);
  }

  /**
   * Transform global y position to local target y
   * @param y 
   * @returns Local 'y'
   */
  transformY(y: number): number {
    let rect = this.boundingClientRect;
    return MathUtils.floor((y - rect.top) / (rect.bottom - rect.top) * this.element.clientHeight);
  }

  /**
   * Transform global x position to normalized target x
   * @param x Normalized local 'x' position
   */
  normTransformX(x: number): number {
    const rect = this.boundingClientRect;
    return (x - rect.left) / (rect.right - rect.left);
  }

  /**
   * Transform global y position to normalized target y
   * @param y Y position
   * @returns Normalized local 'y' position
   */
  normTransformY(y: number): number {
    const rect = this.boundingClientRect;
    return (y - rect.top) / (rect.bottom - rect.top);
  }

  clientRectTransformX(x: number): number {
    return (x - this.clientRect.x) * this.scale.x;
  }

  clientRectTransformY(y: number): number {
    return (y - this.clientRect.y) * this.scale.y;
  }

}