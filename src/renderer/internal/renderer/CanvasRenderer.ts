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