import Color from "../render/color/Color";
import IRenderer from "./IRenderer";
import CanvasSmoothing from "./canvas/CanvasSmoothing";
import { RenderingType, ContextID } from "./RendererProperties";

export default abstract class Renderer implements IRenderer {

    protected _renderContext: ContextID;
    protected _context: CanvasRenderingContext2D | WebGLRenderingContext;
    protected _canvas: HTMLCanvasElement;
    protected _contextBuffer: CanvasRenderingContext2D | WebGLRenderingContext;
    protected _canvasBuffer: HTMLCanvasElement;
    protected _drawCalls: number;
    protected _renderingType: RenderingType;
    protected _doubleBuffer: boolean;
    protected _smoothing: CanvasSmoothing;
    protected _backgroundColor: Color;
    protected _alpha = 1;
    protected _clear: boolean;
    private _width: number;
    private _height: number;

    constructor(contextID: ContextID, DOMCanvas: HTMLCanvasElement, canvasBuffer?: HTMLCanvasElement) {

        this._renderContext = contextID;
        this.doubleBuffer = false;


        this._renderingType = RenderingType.Linear;
        // this._interpolation = InterpolationType.None;

        this._canvas = DOMCanvas;
        this._context = DOMCanvas.getContext(contextID, { alpha: false });


        if (canvasBuffer !== undefined) {
            this._contextBuffer = canvasBuffer.getContext(contextID, { alpha: false });
            this._canvasBuffer = canvasBuffer;
            this._doubleBuffer = true;
        } else {
            this._canvasBuffer = null;
            this._contextBuffer = null;
            this._doubleBuffer = false;
        }

        this._width = DOMCanvas.width;
        this._height =  DOMCanvas.height;

        this._smoothing = new CanvasSmoothing(this._context);
        this._clear = true;

        //this.layer = new RenderLayerManagement();
        this._backgroundColor = Color.black;
        this._alpha = 1;

    }

    public get width(): number {
        return this._width;
    }

    public get height(): number {
        return this._height;
    }

    public get doubleBuffer(): boolean {
        return this._doubleBuffer;
    }
    public set doubleBuffer(value: boolean) {
        this._doubleBuffer = value;
    }

    public get renderContext(): ContextID {
        return this._renderContext;
    }

    public get canvasBuffer(): HTMLCanvasElement {
        if (this._doubleBuffer) {
            return this._canvasBuffer;
        } else {
            return this._canvas;
        }
    }

    public get context(): CanvasRenderingContext2D | WebGLRenderingContext {
        if (this._doubleBuffer) {
            return this._contextBuffer;
        } else {
            return this._context;
        }
    }


    public get drawCalls(): number {
        return this._drawCalls;
    }

    get canvas(): HTMLCanvasElement {
        return this._canvas;
    }

    get backgroundColor() { return this._backgroundColor; }
    set backgroundColor(value: Color) {
        this._backgroundColor.set(value);
    }
    get alpha() { return this._alpha; }
    set alpha(value: number) {

        // if (this._alpha !== value) {
        //     this.currentContext.globalAlpha = value;
        //     this._alpha = value;
        // }


    }

    public get renderingType(): RenderingType {
        return this._renderingType;
    }
    public set renderingType(value: RenderingType) {
        if (this._renderingType !== value) {
            this._smoothing.set(value);
            this._renderingType = value;
        }
    }

    resize(width: number, height: number) {
        this._width = width;
        this._height = height;
        this._canvas.width = width;
        this._canvas.height = height;

        if (this._doubleBuffer === true) {
            this._canvasBuffer.width = width;
            this._canvasBuffer.height = height;
        }
    }

    abstract beginDraw();
    abstract draw();
    abstract endDraw();

}