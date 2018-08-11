import Color from "../../engine/render/color/Color";
import RenderLayersManagement from "./layer/RenderLayerManagement";
import IRenderer from "./IRenderer";
import CanvasSmoothing from "../canvas/CanvasSmoothing";
import { RenderingType, ContextID } from "./RendererProperties";



export default class CanvasRenderer implements IRenderer {


    private _renderContext: ContextID;
    private _context: CanvasRenderingContext2D;
    private _canvas: HTMLCanvasElement;
    private _contextBuffer: CanvasRenderingContext2D;
    private _canvasBuffer: HTMLCanvasElement;
    private _drawCalls: number;
    private _renderingType: RenderingType;
    private _doubleBuffer: boolean;
    private _smoothing: CanvasSmoothing;
    // private _interpolation: InterpolationType;



    private layer: RenderLayersManagement;
    private _backgroundColor: Color;
    private _alpha = 1;


    constructor(DOMCanvas: HTMLCanvasElement, canvasBuffer?: HTMLCanvasElement) {

        this._renderContext = '2d';
        this.doubleBuffer = false;


        this._renderingType = RenderingType.Linear;
        // this._interpolation = InterpolationType.None;

        this._canvas = DOMCanvas;
        this._context = DOMCanvas.getContext('2d', { alpha: false });


        if (canvasBuffer !== undefined) {
            this._contextBuffer = canvasBuffer.getContext('2d', { alpha: false });
            this._canvasBuffer = canvasBuffer;
            this._doubleBuffer = true;
        } else {
            this._canvasBuffer = null;
            this._contextBuffer = null;
            this._doubleBuffer = false;
        }

        this._smoothing = new CanvasSmoothing(this._context);

        //this.layer = new RenderLayerManagement();
        this._backgroundColor = Color.black;
        this._alpha = 1;

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

    public get context(): CanvasRenderingContext2D {
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
        this._canvas.width = width;
        this._canvas.height = height;

        if (this._doubleBuffer === true) {
            this._canvasBuffer.width = width;
            this._canvasBuffer.height = height;
        }
    }

    repaint() {
        this._context.drawImage(this._canvasBuffer, 0, 0);
        // this._context.putImageData(this._canvasBuffer, 0,0)

    }

    // public get interpolation(): InterpolationType {
    //     return this._interpolation;
    // }
    // public set interpolation(value: InterpolationType) {
    //     if (value !== this._interpolation) {
    //         this._interpolation = value;
    //     }
    // }


}