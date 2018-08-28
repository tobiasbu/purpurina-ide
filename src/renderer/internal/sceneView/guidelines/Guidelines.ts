import CanvasDrawer from "../CanvasDrawer";
import Grid from "./Grid";
import View from "../View";
import MathUtils from "../../../engine/math/MathUtils";

const BASESPACING = 10000;

function getSpacing(base: number, factor: number): number {
    const next = base / 10;

    if (factor === base) {
        return base;
    }

    if (next <= factor) {
        return base;
    } else {
        return getSpacing(next, factor);
    }
}

export default class Guidelines {


    private mainGrid: Grid;
    private subGrid: Grid;
    private baseSpacing: number;
    private nextSpacing: number;
    private oldNextSpacing: number;
    private oldSpacingFactor: number;

    constructor(view: View) {
        this.mainGrid = new Grid();
        this.subGrid = new Grid();
        this.subGrid.skipNth = 10;
        const camera = view.camera;
        const spacingFactor = camera.invertedResolution * 100;
        this.baseSpacing = getSpacing(BASESPACING, spacingFactor);
        this.nextSpacing = this.baseSpacing / 10;
        this.oldNextSpacing = this.baseSpacing;
    }

    update(view: View) {

        const camera = view.camera;
        //let zoom = MathUtils.round(camera.resolution * 100);



        const spacingFactor = camera.invertedResolution * 100;

        //console.log(spacingFactor + ' ' + this.oldNextSpacing)



        // to avoid recursive function
        if (this.oldSpacingFactor !== spacingFactor) {
            if (spacingFactor >= BASESPACING) { // reset
                this.baseSpacing = BASESPACING;
                this.nextSpacing = BASESPACING / 10;
            } else {

                //const next = this.baseSpacing / 10;
                if (this.nextSpacing >= spacingFactor) {
                    this.oldNextSpacing = this.nextSpacing;
                    this.baseSpacing = this.nextSpacing;
                    this.nextSpacing = this.baseSpacing / 10;
                } else if (this.oldNextSpacing < spacingFactor) {
                    const base = getSpacing(BASESPACING, spacingFactor);
                    this.baseSpacing = base;
                    this.nextSpacing = base / 10;
                    this.oldNextSpacing  = base;
                }
                
                // }

            }

            const depth = (this.nextSpacing / spacingFactor) - 0.1;
            //this.mainGrid.setAlpha(depth, true);
            this.subGrid.setAlpha(depth);


        }

        this.oldSpacingFactor = spacingFactor;

        const scaledSpacing = this.baseSpacing * camera.resolution * view.aspectRatio;
        const nextSpacingScaled = this.nextSpacing * camera.resolution * view.aspectRatio;

        
        this.mainGrid.spacing = scaledSpacing;
        this.mainGrid.setMaxLines(view.size);
        this.subGrid.spacing = nextSpacingScaled;
        this.subGrid.setMaxLines(view.size);
        
        const offsetX = view.camera.offsetX * view.aspectRatio + view.origin.x;
        const offsetY = view.camera.offsetY * view.aspectRatio + view.origin.y;
        this.mainGrid.setParallax(offsetX, offsetY);
        this.subGrid.setParallax(offsetX, offsetY);
        
        // measure to skip 10th line for subgrids
        let skipStartY = MathUtils.floor(this.mainGrid.parallax.y / scaledSpacing * 10);
        let skipStartX = MathUtils.floor(this.mainGrid.parallax.x / scaledSpacing * 10);

     

        this.subGrid.setSkip(skipStartX, skipStartY);
    }



    render(draw: CanvasDrawer, view: View) {

        draw.context.setTransform(
            1, 0,
            0, 1,
            0.5,
            0.5
        );

        //let color = 'rgb(255, 255, 255,' + MathUtils.clampedLerp(0.1, 0.0, depth) + ')'
        this.mainGrid.render(draw, view);

        //color = 'rgb(255, 255, 255,' + this.subGrid.depthAlpha + ')';
        this.subGrid.render(draw, view);
    }

}