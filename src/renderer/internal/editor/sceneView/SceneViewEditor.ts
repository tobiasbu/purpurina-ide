import Renderer from "../../renderer/Renderer";
import EditorCamera from "../EditorCamera";
import SceneViewInput from "./SceneViewInput";
import EventEmitter from "../../../engine/events/emitter/EventEmitter";
import { CursorMode } from "./SceneViewCursor";
import MathUtils from "../../../engine/math/MathUtils";
import Rect from "../../../engine/math/Rect";

export default class SceneViewEditor {
    private _renderer: Renderer;
    private _editorCamera: EditorCamera;
    private _editorInput: SceneViewInput;
    private _emitter: EventEmitter;
    private _selectionArea: Rect;

    constructor(renderer: Renderer) {
        this._renderer = renderer;
        this._editorCamera = new EditorCamera(renderer);
        this._emitter = new EventEmitter();

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

        this._emitter.on('redraw', () => {
            this.render();
        })


        this._editorInput = new SceneViewInput(this._renderer.canvas, this._emitter);
        this._editorInput.init();
        this.update();


    }

    public get renderer(): Renderer {
        return this._renderer;
    }

    resize(width: number, height: number) {
        this._renderer.resize(width, height);
        this._editorInput.resize();
        this.render();

    }

    private update() {
        this._editorCamera.updateTransform();
    }

    private render() {

        const ctx = this._renderer.context as CanvasRenderingContext2D;


        // scene

        this._renderer.beginDraw();

        this._renderer.draw();
        const hanx = 0 * this._editorCamera.resolution;
        const hany = 0 * this._editorCamera.resolution;
        const lw = 80; // 73
        const th = 16; // 12
        const tw = 24; // 17

        const h = this._renderer.height;
        const w = this._renderer.width;
        const f = (w / h) * 100 * this._editorCamera.resolution;//((w / h) * 100 * this._editorCamera.resolution);
        const ws = MathUtils.floor(this._renderer.width / f);
        const hs = this._renderer.height / f;
        const xg = this._editorCamera.position.x % f;
        const yg = this._editorCamera.position.y % f;
        ctx.lineWidth = 0.25;

        // for (let i = 0; i < ws; i++) {
        //     ctx.beginPath();
        //     ctx.moveTo(i * f + xg, 0);
        //     ctx.lineTo(i * f + xg, h);

        //     ctx.stroke();

        // }

        // for (let i = 0; i < hs; i++) {
        //    ctx.beginPath();
        //     ctx.moveTo(0, i * f + yg);
        //     ctx.lineTo(w, i * f + yg);
        //     ctx.stroke();

        //     ctx.stroke();

        // }
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.moveTo(w * 0.5, 0);
        ctx.lineTo(w * 0.5, h);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, h * 0.5);
        ctx.lineTo(w, h * 0.5);
        ctx.stroke();



        // }

        const editorCameraMatrix = this._editorCamera.matrix.a;

        //console.log(this._editorCamera.matrix.toString());

        ctx.setTransform(
            editorCameraMatrix[0], editorCameraMatrix[1],
            editorCameraMatrix[3], editorCameraMatrix[4],
            editorCameraMatrix[6],
            editorCameraMatrix[7]
        );



        // const pos =this._editorCamera.matrix.transformPoint(this._editorInput.cursor.position.x,this._editorInput.cursor.position.y);

        // console.log(pos);
        
        // if (
        //     pos.x > 0 && pos.y > 0
        //     && pos.x < 100 && pos.y < 100) {
        //     ctx.fillStyle = 'red';
        // } else {
        //     ctx.fillStyle = 'blue';
        // }

        ctx.fillStyle = 'blue';
        ctx.fillRect(0, 0, 100, 100);

        const inv = this._editorCamera.inversedMatrix.a;


        ctx.setTransform(
            inv[0], inv[1],
            inv[3], inv[4],
            inv[6],
            inv[7]
        );

        // render.drawCalls = 0;     

        ctx.beginPath();
        ctx.moveTo(hanx, hany);
        ctx.lineTo(hanx + lw, hany);
        ctx.lineCap = 'square';
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'white';
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(hanx + lw, hany - th / 2);
        ctx.lineTo(hanx + lw, hany + th / 2);
        ctx.lineTo(hanx + lw + tw, hany);
        ctx.lineWidth = 0;
        ctx.strokeStyle = 'none';
        ctx.fillStyle = 'white';
        ctx.fill();

        // handles

        ctx.setTransform(
            1, 0,
            0, 1,
            0,
            0
        );

        if (this._editorInput.cursor.state === CursorMode.Selection) {

           
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