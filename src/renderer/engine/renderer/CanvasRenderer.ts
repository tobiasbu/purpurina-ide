import IRenderer from "./IRenderer";
import Renderer from "./Renderer";



export default class CanvasRenderer extends Renderer implements IRenderer {


    protected _context: CanvasRenderingContext2D;
    protected _contextBuffer: CanvasRenderingContext2D;

    constructor(DOMCanvas: HTMLCanvasElement, canvasBuffer?: HTMLCanvasElement) {
        super('2d', DOMCanvas, canvasBuffer);
    }

    public get context(): CanvasRenderingContext2D {
        if (this._doubleBuffer) {
            return this._contextBuffer;
        } else {
            return this._context;
        }
    }


    // public get interpolation(): InterpolationType {
    //     return this._interpolation;
    // }
    // public set interpolation(value: InterpolationType) {
    //     if (value !== this._interpolation) {
    //         this._interpolation = value;
    //     }
    // }


    beginDraw() {

        const ctx = this.context;


        if (this._clear) {
            ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        }

        ctx.fillStyle = this._backgroundColor.rgba;
        ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);

    }

    draw() {
        // if (!this._enable)
        //    return;

        const ctx = this.context;

        if (this._alpha !== 1) {
            ctx.globalAlpha = 1;
            this._alpha = 1;
        }

        //ctx.globalCompositeOperation = 'source-over';
    }

    endDraw() {

        const ctx = this.context;

        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = 'source-over';

        ctx.setTransform(1,0,0,1,0,0);
        

        if (this._doubleBuffer) { // if is double buffer, submit to the real context
            this._context.drawImage(this._canvasBuffer, 0, 0);
        }


    }

}