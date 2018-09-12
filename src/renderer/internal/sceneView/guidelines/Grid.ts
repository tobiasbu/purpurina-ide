import CanvasDrawer from "../CanvasDrawer";
import MathUtils from "../../../engine/math/MathUtils";
import View from "../View";

export default class Grid {


    private maxHorizontalLines: number;
    private maxVerticalLines: number;
    private _parallax: IVector2;

    private color: string;
    private alpha: number;
    spacing: number;
    skipNth: number;
    private skipStart: IVector2;

    //depthAlpha: number;

    public get parallax(): IVector2 {
        return this._parallax;
    }

    constructor() {
        this._parallax = { x: 0, y: 0 };
        this.skipNth = undefined;
        this.alpha = 0.1;
        this.color = 'rgba(255, 255, 255,' + 0.1 + ')';
    }

    setSkip(skipX: number, skipY: number): void {

        if (skipX < 0) {
            skipX -= this.skipNth;
        }

        if (skipY < 0) {
            skipY -= (this.skipNth - 1);
        }

        this.skipStart = {
            x: skipX,
            y: skipY
        };


    }

    setParallax(offsetX: number, offsetY: number) {
        this._parallax.x = offsetX % this.spacing;
        this._parallax.y = offsetY % this.spacing;
    }

    setMaxLines(viewSize: IVector2): void {
        this.maxHorizontalLines = MathUtils.floor(viewSize.x / this.spacing) + 1;
        this.maxVerticalLines = MathUtils.floor(viewSize.y / this.spacing) + 1;
    }

    setAlpha(factor: number, inversed?: boolean): void {
        this.alpha = (inversed === true) ? MathUtils.clampedLerp(0.1, 0.0, factor) : MathUtils.clampedLerp(0.0, 0.1, factor);
        this.color = 'rgba(255, 255, 255,' + this.alpha.toString() +  ')';
    }

    render(draw: CanvasDrawer, view: View) {

        if (this.alpha <= 0)
            return;

        draw.outlineColor = this.color;
   
        
        // draw vertical lines
        for (let x = 0; x <= this.maxHorizontalLines; x++) {

            if (this.skipNth !== undefined) {
                if (x >= this.skipStart.x) {
                    if ((x - this.skipStart.x) % this.skipNth === 0) {
                        continue;
                    }
                }
            }


            //const space = x * this.spacing;
            const xx = MathUtils.round(this.parallax.x + x * this.spacing);

            if (xx > view.size.x)
                break;
            else if (xx < 0)
                continue;



            draw.line(xx, 0, xx, view.size.y);

        }

        // draw horizontal lines
        for (let y = 0; y <= this.maxVerticalLines; y++) {

            // line skipper
            if (this.skipNth !== undefined) {
                if (y >= this.skipStart.y) {
                    if ((y - this.skipStart.y) % this.skipNth === 0) {
                        continue;
                    }
                }
            }

            //const space = y * this.spacing;
            const yy = MathUtils.round(this._parallax.y + y * this.spacing);

            if (yy > view.size.y)
                break;
            else if (yy < 0)
                continue;

            draw.line(0, yy, view.size.x, yy);
        }


    }
}