import Rect from "../../../engine/math/Rect";
import Entity from "../../../engine/entity/Entity";
import Vector2 from "../../../engine/math/Vector2";
import MathUtils from "../../../engine/math/MathUtils";
import View from "./View";
import CanvasDrawer from "./CanvasDrawer";

const POSITION_HANDLE_SIZE = 80;
const HANDLE_DIR_WIDTH = 16;
const HANDLE_DIR_HEIGHT = 6;

function drawHandle(draw: CanvasDrawer, x: number, y: number, angle: number, color:string) {
    const r = angle * MathUtils.degtorad;
    draw.context.save();
    draw.context.translate(x, y);
    draw.context.rotate(r);

    


    // line
    draw.outlineColor = color;
    draw.color = color;
    draw.line(0,0, POSITION_HANDLE_SIZE, 0);
    // ctx.beginPath();
    // ctx.moveTo(0, 0);
    // ctx.lineTo(POSITION_HANDLE_SIZE, 0);
    // ctx.lineCap = 'square';
    // ctx.lineWidth = 1;
    // ctx.strokeStyle = color;
    // ctx.stroke();

    // arrow
    draw.triangle(POSITION_HANDLE_SIZE,0, HANDLE_DIR_HEIGHT, HANDLE_DIR_WIDTH)
    // ctx.beginPath();
    // ctx.moveTo(POSITION_HANDLE_SIZE, -HANDLE_DIR_HEIGHT);
    // ctx.lineTo(POSITION_HANDLE_SIZE, HANDLE_DIR_HEIGHT);
    // ctx.lineTo(POSITION_HANDLE_SIZE + HANDLE_DIR_WIDTH, 0);
    // ctx.strokeStyle = 'none';
    // ctx.fillStyle = color;
    // ctx.fill();

    draw.context.restore();

}

const redColor = '#ca403a';
const blueColor = '#3a77ca';
const greenColor = '#3aca49';

export default class EditorHandles {

    //private _handleMode: number;
    private _selectedEntity: Entity;
    private _position: Vector2;
    private _view: View;

    constructor(view: View) {
        this._position = new Vector2();
        this._selectedEntity = null;
        this._view = view;
    }

    setSelectEntity(entity: Entity) {
        this._selectedEntity = entity;
        if (entity !== null) {
            this._position = entity.transform.position;
        }
    }

    selectEntityInArea(rect: Rect) {

    }

    render(draw: CanvasDrawer) {

        if (this._selectedEntity !== null) {

            //const lw = 80; // 73
            //const th = 16; // 12
            //const tw = 24; // 17
            //const x = (this._position.x + 50) * this._editorCamera.resolution;// * this._editorCamera.aspectRatio;
            //const y = (this._position.y + 50) * this._editorCamera.resolution;//  * this._editorCamera.aspectRatio;

            const correction = this._view.camera.resolution * this._view.aspectRatio;
            //const ox =  50 * correction;
            //const oy =  50 * correction);
            const x = Math.round(this._position.x * correction);
            const y = Math.round(this._position.y * correction);

           
            // free move rectangle
            draw.outlineRect(x, y-20,20,20, greenColor, 1)
            draw.alpha = 0.1;
            draw.rect(x, y-20,20,20, greenColor)
            draw.alpha = 1;

            drawHandle(draw, x, y, 270,redColor);
            drawHandle(draw, x, y, 0, blueColor);



        }

    }

}