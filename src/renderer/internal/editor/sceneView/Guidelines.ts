import MathUtils from "../../../engine/math/MathUtils";
import IRenderer from "../../../engine/renderer/IRenderer";
import EditorCamera from "../EditorCamera";
import Vector2 from "../../../engine/math/Vector2";
import { CanvasDrawer } from "../CanvasDrawer";



export default class Guidelines {

    private spacing: number = 1000;
    private subDivisionSpacing: number;

    private _renderer: IRenderer;
    private _scaledSpacing: number;
    private _maxHorizontalLines: number;
    private _subMax:number;
    private _horizontalSpacing: number;
    private _maxVerticalLines: number;
    private _verticalSpacing: number;
    
    private _parallax: Vector2;
    subParallax:number;
    t:number;

    constructor(renderer: IRenderer) {
        this._renderer = renderer;
        this._parallax = new Vector2();
    }

    private computeLineScale(size: number, spacing: number) {
        return MathUtils.floor(size / spacing) + 1;
    }

    update(camera: EditorCamera) {

        
        const spacing = this.spacing * camera.resolution;
        const subDivisionSpacing = (this.spacing / 2) * camera.resolution;

        this.subDivisionSpacing = subDivisionSpacing;
        this.t = camera.zoomFactor * subDivisionSpacing / 2 // subDivisionSpacing / camera.invertedResolution;
        console.log(this.t)

        this._maxHorizontalLines = this.computeLineScale(this._renderer.width, spacing);
        this._subMax = this.computeLineScale(this._renderer.width, subDivisionSpacing);

        this.subParallax = camera.offsetX % subDivisionSpacing - 1;
        
        this._parallax.x = camera.offsetX % spacing - 1;
        this._horizontalSpacing = spacing;

        this._maxVerticalLines =  this.computeLineScale(this._renderer.height, spacing); //MathUtils.round(this._renderer.height / spacing) + 1;
        this._parallax.y = camera.offsetY % spacing - 1;
        this._verticalSpacing = spacing;

        //const halfWidth = w / 2;
        //const midX = halfWidth * this._editorCamera.resolution;
        //const maxHorizontalHalfGrids = MathUtils.round((halfWidth / horizontalSpacing));// * this._editorCamera.resolution;

        ////-this._editorCamera.position.x * this._editorCamera.resolution;

        //const halfGridWidth = ((maxHorizontalGrids*horizontalSpacing) / 2);
        //const gridOffsetX = halfGridWidth % horizontalSpacing-1;

    }

    render(draw: CanvasDrawer) {

        draw.context.setTransform(
            1, 0,
            0, 1,
            0.5,
            0.5
        );

        draw.outlineColor = 'rgb(255, 255, 255, 0.2)';

        let total = 0;

        for (let x = 0; x <= this._maxHorizontalLines; x++) {
            const space = x * this._horizontalSpacing;
            const xx = MathUtils.round(this._parallax.x + space);

            if (xx > this._renderer.width)
                break;

            draw.line(xx, 0, xx, this._renderer.height);
            total++;
        }

        //console.log(total);

        for (let y = 0; y <= this._maxVerticalLines; y++) {
            const space = y * this._verticalSpacing;
            const yy = MathUtils.round(this._parallax.y + space);
            draw.line(0, yy, this._renderer.width, yy);
        }

        let alpha = MathUtils.clampedLerp(0, 0.2, this.t);

        draw.outlineColor = 'rgb(255, 255, 255,' + alpha + ')';

        for (let x = 0; x <= this._subMax; x++) {
            const space = x * this.subDivisionSpacing;
            const xx = MathUtils.round(this.subParallax + space);
            draw.line(xx, 0, xx, this._renderer.height);
        }


        

    }



}