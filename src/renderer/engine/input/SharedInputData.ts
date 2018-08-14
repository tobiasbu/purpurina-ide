import Rect from "../../engine/math/Rect";
import Vector2 from "../../engine/math/Vector2";
import IRenderer from "../renderer/IRenderer";
import MathUtils from "../../engine/math/MathUtils";
import IInputManager from "./IInputManager";

export default class SharedInputData {

    private manager: IInputManager;
    canvas: HTMLCanvasElement;
    private clientRect: Rect;
    private boundingClientRect: ClientRect | DOMRect;
    private scale: IVector2;


    constructor(inputManager, renderer: IRenderer) {
        this.manager = inputManager;
        this.canvas = renderer.canvas;
        this.clientRect = new Rect();
        this.boundingClientRect = null;
        this.scale = new Vector2(1, 1);
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