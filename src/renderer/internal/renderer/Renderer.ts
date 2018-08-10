import Color from "../../engine/render/color/Color";

type ContextID = '2d' | 'webgl';

export default class Renderer {

    private doubleBuffer = false;
    private smoothing = null;
    private imageRendering = null;
    private _renderContext: ContextID = null;
    private _canvas: HTMLCanvasElement = null;
    private _domCanvas: HTMLCanvasElement = null;
    private _context: CanvasRenderingContext2D = null;
    private layer = new RenderLayerManagment();
    private _backgroundColor: Color;
    private _drawCalls = 0;
    private _alpha = 1;

    constructor(renderContext: ContextID) {

        this._renderContext = renderContext;
        this.doubleBuffer = false;
        this.smoothing = null;
        this.imageRendering = null;
        this._canvas = null;
        this._context = null;
        this.layer = new RenderLayerManagment();
        this._backgroundColor = Color.black;
        this._alpha = 1;

    }

    get domCanvas(): HTMLCanvasElement {
        if (this.doubleBuffer) {
            return this._domCanvas;
        } else {
            return this._canvas;
        }
    }

    get backgroundColor() { return this._backgroundColor; }
    set backgroundColor(value: Color) {
        this._backgroundColor = value;
    }
    get alpha() { return this._alpha; }
    set alpha(value: number) {

        if (this._alpha !== value) {
            this.currentContext.globalAlpha = value;
            this._alpha = value;
        }

        return this._alpha;
    }
}