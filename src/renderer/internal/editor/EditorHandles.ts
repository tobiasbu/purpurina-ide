import Rect from "../../engine/math/Rect";
import Entity from "../../engine/entity/Entity";
import Vector2 from "../../engine/math/Vector2";
import EditorCamera from "./EditorCamera";
import MathUtils from "../../engine/math/MathUtils";

const POSITION_HANDLE_SIZE = 80;
const HANDLE_DIR_WIDTH = 16;
const HANDLE_DIR_HEIGHT = 8;

function drawHandle(ctx: CanvasRenderingContext2D, x: number, y: number, angle: number) {
    ctx.save();
    ctx.translate(x, y)
    ctx.rotate(angle * MathUtils.radtodeg)



    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(POSITION_HANDLE_SIZE, 0);
    ctx.lineCap = 'square';
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'white';
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(POSITION_HANDLE_SIZE, -HANDLE_DIR_HEIGHT);
    ctx.lineTo(POSITION_HANDLE_SIZE, HANDLE_DIR_HEIGHT);
    ctx.lineTo(POSITION_HANDLE_SIZE + HANDLE_DIR_WIDTH, 0);
    ctx.lineWidth = 0;
    ctx.strokeStyle = 'none';
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.restore();

}

export default class EditorHandles {

    //private _handleMode: number;
    private _selectedEntity: Entity;
    private _position: Vector2;
    private _editorCamera: EditorCamera;

    constructor(editorCamera: EditorCamera) {
        this._position = new Vector2();
        this._selectedEntity = null;
        this._editorCamera = editorCamera;
    }

    setSelectEntity(entity: Entity) {
        this._selectedEntity = entity;
        if (entity !== null) {
            this._position = entity.transform.position;
        }
    }

    selectEntityInArea(rect: Rect) {

    }

    render(ctx: CanvasRenderingContext2D) {

        if (this._selectedEntity !== null) {

            //const lw = 80; // 73
            //const th = 16; // 12
            //const tw = 24; // 17
            const x = (this._position.x + 50) * this._editorCamera.resolution;
            const y = (this._position.y + 50) * this._editorCamera.resolution;


            drawHandle(ctx, x, y, 0);
            drawHandle(ctx, x, y, 270);



        }

    }

}