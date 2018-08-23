import CanvasRenderer from "../../engine/renderer/CanvasRenderer";

export class CanvasDrawer {


    private _ctx: CanvasRenderingContext2D;
    private _outlineWidth = 0;
    private _fillStyle = 'white';
    private _strokeStyle: string = 'white';
    private _alpha: number = 1;

    public get context(): CanvasRenderingContext2D {
        return this._ctx;
    }

    set color(value: string) {
        this._ctx.fillStyle = value;
        this._fillStyle = this._ctx.fillStyle;
    }

    set outlineColor(value: string) {
        if (this._ctx.strokeStyle !== value) {
            this._ctx.strokeStyle = value;
            this._strokeStyle = this._ctx.strokeStyle;
        }
    }

    set alpha(value: number) {
        if (this._ctx.globalAlpha !== value) {
            this.context.globalAlpha = value;
            this._alpha = this.context.globalAlpha;
        }
    }

    constructor(canvasRenderer: CanvasRenderer) {
        this._ctx = canvasRenderer.context;
    }

    text(text: string, x: number, y: number): void {
        this._ctx.fillText(text,x,y);
    }

    line(fromX: number, fromY: number, toX: number, toY: number) {
        this._ctx.beginPath();
        this._ctx.moveTo(fromX, fromY);
        this._ctx.lineTo(toX, toY);
        this._ctx.stroke();
    }

    triangle(x: number, y: number, halfHeight:number, width:number) {
        const ctx = this.context;

        ctx.beginPath();
        ctx.moveTo(x, y-halfHeight);
        ctx.lineTo(x, y+halfHeight);
        ctx.lineTo(x + width, y);
        //ctx.strokeStyle = 'none';
        //ctx.fillStyle = color;
        ctx.fill();
    }

    rect(x: number, y: number, width: number, height: number, color?: string) {

        if (!color) {
            this._ctx.fillStyle = this._fillStyle;
        } else {
            this.color = color;
        }

        this._ctx.strokeStyle = color;
        this._ctx.fillRect(x, y, width, height)

    }

    outlineRect(x: number, y: number, width: number, height: number, outlineColor?: string, outlineWidth?: number) {


        if (!outlineWidth) 
            outlineWidth = this._outlineWidth;
        if (!outlineColor) {
            this._ctx.strokeStyle = this._strokeStyle;
        } else {
            this.outlineColor = outlineColor;
        }

        if (outlineWidth > 0) {
            this._ctx.lineWidth = outlineWidth;
            this._ctx.strokeRect(x, y, width, height)
        }
    }

}