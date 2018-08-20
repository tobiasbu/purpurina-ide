import { CanvasDrawer } from "../../CanvasDrawer";
import MathUtils from "../../../../engine/math/MathUtils";

export default class LineDivision {
    subDivisionSpacing: number;
    maxHorizontalLines: number;
    maxVerticalLines: number;
    depthAlpha: number;
    parallax: IVector2;

    constructor() {
        this.depthAlpha = 0.1;
        this.parallax = { x: 0, y: 0 };
    }



    // static subdivide(baseSpacing: number, factor: number, view: IVector2) {

    //     const spacing = factor / baseSpacing;

    //     let division = new LineDivision();
    //     division.subDivisionSpacing = spacing;
    //     division.maxHorizontalLines = MathUtils.floor(view.size.x / spacing) + 1;
    //     division.minVerticalLines = MathUtils.floor(view.size.y / spacing) + 1;
    //     division.parallax.x = view.offsetX % spacing - 1;
    //     division.parallax.y = view.offsetY % spacing - 1;
    //     division.depthAlpha = 1;
    //     //parent.child = this;

    //     if (factor > maxFactor) {
    //         return division;
    //     } else {
    //         parent.child = LineDivision.subdivide();
    //     }
    // }



    static transformTree(parent: LineDivision, view) {

    }


    render(draw: CanvasDrawer, rendererSize: IVector2, color: string) {

        draw.outlineColor = color;


        // draw horizontal lines
        for (let x = 0; x <= this.maxHorizontalLines; x++) {
            const space = x * this.subDivisionSpacing;
            const xx = MathUtils.round(this.parallax.x + space);

            if (xx > rendererSize.x)
                break;

            draw.line(xx, 0, xx, rendererSize.y);

        }

        // draw vertical lines
        for (let y = 0; y <= this.maxVerticalLines; y++) {
            const space = y * this.subDivisionSpacing;
            const yy = MathUtils.round(this.parallax.y + space);
            draw.line(0, yy, rendererSize.x, yy);
        }


    }
}