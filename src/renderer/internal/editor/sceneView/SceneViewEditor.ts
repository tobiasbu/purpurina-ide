import Renderer from "../../../engine/renderer/Renderer";
import EditorCamera from "../EditorCamera";
import SceneViewInput from "./SceneViewInput";
import EventEmitter from "../../../engine/events/emitter/EventEmitter";
import { CursorMode } from "./SceneViewCursor";
import Rect from "../../../engine/math/Rect";
import EntityTest from "../../../engine/entity/EntityTest";
import { computeTransform2D, computeBounds2D } from "../../../engine/math/transform/compute";
import Transform2D from "../../../engine/math/transform/Transform2D";
import Random from "../../../engine/math/random/Random";
import Bounds2D from "../../../engine/math/bounds/Bounds2D";
import EditorHandles from "../EditorHandles";

let list: EntityTest[] = []

function renderRect(context: CanvasRenderingContext2D, entity: EntityTest, color: string = 'blue') {
    const m = entity.transform.matrix;

    context.setTransform(
        m.a[0], m.a[1], // 2
        m.a[3], m.a[4], // 5
        m.a[6], m.a[7]);

    /* if (rectangle.outlineWidth > 0) {
         context.lineWidth = rectangle.outlineWidth;
         context.strokeStyle = rectangle.outlineColor;
         context.strokeRect(0, 0, rectangle.width, rectangle.height);
     }*/

    context.fillStyle = color
    context.fillRect(0, 0, 100, 100);
}

function createEntities() {
    for (let i = 0; i < 10; i++) {
        const x = Random.irange(-500, 500);
        const y = Random.irange(-500, 500);
        let e = new EntityTest('My Object');
        e.transform.position.x = x;
        e.transform.position.y = y;
        list.push(e);
    }
}

export default class SceneViewEditor {
    private _renderer: Renderer;
    private _editorCamera: EditorCamera;
    private _handles: EditorHandles;
    private _editorInput: SceneViewInput;
    private _emitter: EventEmitter;
    private _selectionArea: Rect;

    constructor(renderer: Renderer) {
        this._renderer = renderer;
        this._editorCamera = new EditorCamera(renderer);
        this._emitter = new EventEmitter();
        this._editorInput = new SceneViewInput(this._renderer.canvas, this._emitter);
        this._handles = new EditorHandles(this._editorCamera);
        createEntities();
    }

    init() {

        this._emitter.on('zoom', (delta: number, zoomPoint: IVector2) => {

            this._editorCamera.zoom(delta, zoomPoint);

            //this._editorCamera.setPosition(cursorPosition);
            this.update();
            this.render();

        }, this);

        this._emitter.on('move', (cursorPosition: IVector2) => {

            this._editorCamera.move(cursorPosition);

            //this._editorCamera.setPosition(cursorPosition);
            this.update();
            this.render();

        }, this);

        this._emitter.on('prepareViewMove', () => {
            this._editorCamera.prepareMove();
        }, this)

        this._emitter.on('selection', (area: Rect) => {
            this._selectionArea = area;
            this.render();
        }, this)

        this._emitter.on('select', (cursorPosition: IVector2) => {
           
            for (let i = 0; i < list.length; i++) {
                let b = new Bounds2D();
                computeBounds2D(b, list[i].transform.matrix, 100, 100, { x: 0, y: 0 });
                if (b.contains(cursorPosition.x, cursorPosition.y)) {
                    this._handles.setSelectEntity(list[i]);
                    break;
                }
            }
        }, this)


        this._emitter.on('redraw', () => {
            this.render();
        })

        this._editorInput.init();
        this.update();
    }

    public get renderer(): Renderer {
        return this._renderer;
    }

    resize(width: number, height: number) {
        this._renderer.resize(width, height);
        this._editorInput.resize();
        this.update();
        this.render();

    }

    private update() {
        this._editorCamera.updateTransform();
        for (let i = 0; i < list.length; i++) {
            computeTransform2D(list[i].transform as Transform2D);
            list[i].transform.matrix.concat(this._editorCamera.matrix);
        }
    }

    private render() {

        const ctx = this._renderer.context as CanvasRenderingContext2D;


        // scene

        this._renderer.beginDraw();

        this._renderer.draw();

        for (let i = 0; i < list.length; i++) {



            let color = 'blue';


            renderRect(ctx, list[i], color);
        }


        //
        // const a = (w / h);
        // const f = a * 100 * this._editorCamera.resolution;//((w / h) * 100 * this._editorCamera.resolution);
        // //let xg = this._editorCamera.position.x * this._editorCamera.invertedResolution;
        // //const ofx = (xg + w * 0.5) - xg;
        // //xg = xg % ofx
        // const ws = MathUtils.floor(w / f) + 1;
        // const hs = this._renderer.height / f;

        // const yg = this._editorCamera.position.y % f;
        // ctx.lineWidth = 0.25;

        // for (let i = 0; i < ws; i++) {
        //     ctx.beginPath();
        //     ctx.moveTo((i * f), 0);
        //     ctx.lineTo((i * f), h);

        //     ctx.stroke();

        // }

        // for (let i = 0; i < hs; i++) {
        //    ctx.beginPath();
        //     ctx.moveTo(0, i * f + yg);
        //     ctx.lineTo(w, i * f + yg);
        //     ctx.stroke();

        //     ctx.stroke();

        // }

        // const h = this._renderer.height;
        // const w = this._renderer.width;
        // ctx.strokeStyle = 'white';
        // ctx.beginPath();
        // ctx.moveTo(w * 0.5, 0);
        // ctx.lineTo(w * 0.5, h);
        // ctx.stroke();

        // ctx.beginPath();
        // ctx.moveTo(0, h * 0.5);
        // ctx.lineTo(w, h * 0.5);
        // ctx.stroke();



        // }

        //const editorCameraMatrix = this._editorCamera.matrix.a;
        const inv = this._editorCamera.handlesMatrix.a;


        // ctx.setTransform(
        //     inv[0], inv[1],
        //     inv[3], inv[4],
        //     inv[6],
        //     inv[7]
        // );

        // for (let i = 0; i < 10; i++) {
        //     ctx.beginPath();
        //     ctx.moveTo(0, i * 100);
        //     ctx.lineTo(w * this._editorCamera.resolution, i * 100);
        //     ctx.stroke();
        //     ctx.stroke();
        // }

        // ctx.setTransform(
        //     editorCameraMatrix[0], editorCameraMatrix[1],
        //     editorCameraMatrix[3], editorCameraMatrix[4],
        //     editorCameraMatrix[6],
        //     editorCameraMatrix[7]
        // );



        // const pos =this._editorCamera.matrix.transformPoint(this._editorInput.cursor.position.x,this._editorInput.cursor.position.y);

        // console.log(pos);

        // if (
        //     pos.x > 0 && pos.y > 0
        //     && pos.x < 100 && pos.y < 100) {
        //     ctx.fillStyle = 'red';
        // } else {
        //     ctx.fillStyle = 'blue';
        // }

        // ctx.fillStyle = 'blue';
        // ctx.fillRect(-50, -50, 100, 100);



        ctx.setTransform(
            inv[0], inv[1],
            inv[3], inv[4],
            inv[6],
            inv[7]
        );

        this._handles.render(ctx);

        ctx.setTransform(
            1, 0,
            0, 1,
            0,
            0
        );

        if (this._editorInput.cursor.mode === CursorMode.Selection) {


            ctx.strokeStyle = 'rgb(33, 69, 128)';
            ctx.lineWidth = 1;
            ctx.strokeRect(
                this._selectionArea.x,
                this._selectionArea.y, this._selectionArea.width, this._selectionArea.height)
            ctx.fillStyle = 'rgba(33, 69, 128, 0.2)';
            ctx.fillRect(
                this._selectionArea.x,
                this._selectionArea.y, this._selectionArea.width, this._selectionArea.height)
        }

        this._renderer.endDraw();
    }

}