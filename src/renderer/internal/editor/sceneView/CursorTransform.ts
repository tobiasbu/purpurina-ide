import MathUtils from "../../../engine/math/MathUtils";
import Rect from "../../../engine/math/Rect";

export default class CursorTransform {

    canvas: HTMLCanvasElement;
    private clientRect: Rect;
    private boundingClientRect: ClientRect | DOMRect;
    private scale: IVector2;


    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.clientRect = new Rect();
        this.boundingClientRect = null;
        this.updateClientRect();
    }

    updateClientRect() {

        let rect = this.clientRect;
        let clientRect = this.canvas.getBoundingClientRect();
        this.boundingClientRect = clientRect;

        rect.x = clientRect.left + window.pageXOffset - document.documentElement.clientLeft;
        rect.y = clientRect.top + window.pageYOffset - document.documentElement.clientTop;
        rect.width = clientRect.width;
        rect.height = clientRect.height;
    }

    transform(position: IVector2): IVector2 {
        let rect = this.boundingClientRect;
        let pos = { x: 0, y: 0 };
        pos.x = MathUtils.floor((position.x - rect.left) / (rect.right - rect.left) * this.canvas.width);
        pos.y = MathUtils.floor((position.y - rect.top) / (rect.bottom - rect.top) * this.canvas.height);
        return pos;
    }

    transformX(x) {
        let rect = this.boundingClientRect;
        return MathUtils.floor((x - rect.left) / (rect.right - rect.left) * this.canvas.width);
    }

    transformY(y) {
        let rect = this.boundingClientRect;
        return MathUtils.floor((y - rect.top) / (rect.bottom - rect.top) * this.canvas.height);
    }

    normTransformX(x: number): number {
        const rect = this.boundingClientRect;
        return (x - rect.left) / (rect.right - rect.left);
    }

    normTransformY(y: number): number {
        const rect = this.boundingClientRect;
        return (y - rect.top) / (rect.bottom - rect.top);
    }

    clientRectTransformX(x) {
        return (x - this.clientRect.x) * this.scale.x;
    }

    clientRectTransformY(y) {
        return (y - this.clientRect.y) * this.scale.y;
    }

}