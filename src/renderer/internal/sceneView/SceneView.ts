import Renderer from "../../../engine/renderer/Renderer";
import EventEmitter from "../../../engine/events/emitter/EventEmitter";
import Rect from "../../../engine/math/Rect";

import { computeTransform2D, computeBounds2D } from "../../../engine/math/transform/compute";
import Transform2D from "../../../engine/math/transform/Transform2D";
import Bounds2D from "../../../engine/math/bounds/Bounds2D";
import EditorHandles from "./EditorHandles";
import CanvasDrawer from "./CanvasDrawer";
import CanvasRenderer from "../../../engine/renderer/CanvasRenderer";
import Guidelines from "./guidelines/Guidelines";
import View from "./View";
import Entity from "../../../engine/entity/Entity";
import { Selection, Events, Pointer } from "../managers";
import ViewInput from "./ViewInput";
import { PointerMode } from "../managers/pointer/PointerManager";
import { DOOM } from "../../doom";

let list: Entity[] = []



function renderRect(context: CanvasRenderingContext2D, entity: Entity, color: string = 'blue') {
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
    let e = new Entity('My Object');
    e.transform.position.x = -50;
    e.transform.position.y = -50;
    list.push(e);

    e = new Entity('My Object');
    e.transform.position.x = 1000 + -50;
    e.transform.position.y = -50;
    list.push(e);

    e = new Entity('My Object');
    e.transform.position.x = 100;
    e.transform.position.y = -50;
    list.push(e);
    // for (let i = 0; i < 10; i++) {
    //     const x = Random.irange(-500, 500);
    //     const y = Random.irange(-500, 500);
    //     let e = new EntityTest('My Object');
    //     e.transform.position.x = x;
    //     e.transform.position.y = y;
    //     list.push(e);
    // }
}



export default class SceneView {

    private _renderer: Renderer;
    private _handles: EditorHandles;
    private _editorInput: ViewInput;
    private _guides: Guidelines;
    private _emitter: EventEmitter;
    private _selectionArea: Rect;
    private _view: View;
    private draw: CanvasDrawer;
    private _painting = false;

    constructor(renderer: Renderer) {
        this._renderer = renderer;
        this._emitter = new EventEmitter();

        this._view = new View();

        this._editorInput = new ViewInput(this._renderer.canvas, this._emitter);
        this._handles = new EditorHandles(this._view);
        this.draw = new CanvasDrawer(renderer as CanvasRenderer);
        this._guides = new Guidelines(this._view);

        createEntities();

    }

    init() {



        this._emitter.on('zoom', (delta: number, zoomPoint: IVector2) => {

            this._view.zoom(delta, zoomPoint);

            //this._editorCamera.setPosition(cursorPosition);
            this.update();
            this.render();

        }, this);

        this._emitter.on('move', (cursorPosition: IVector2) => {

            this._view.move(cursorPosition);

            //this._editorCamera.setPosition(cursorPosition);
            this.update();
            this.render();

        }, this);

        this._emitter.on('prepareViewMove', () => {
            this._view.prepareMove();
        }, this)

        this._emitter.on('selection', (area: Rect) => {
            this._selectionArea = area;
            this.render();
        }, this)

        this._emitter.on('select', (cursorPosition: IVector2) => {

            let entity = null;
            for (let i = 0; i < list.length; i++) {
                let b = new Bounds2D();
                computeBounds2D(b, list[i].transform.matrix, 100, 100, { x: 0, y: 0 });
                if (b.contains(cursorPosition.x, cursorPosition.y)) {
                    entity = list[i];
                    break;

                    // Manager.selection.setActiveEntity(list[i]);

                }
            }

            if (entity !== null) {
                this._handles.setSelectEntity(entity);
                Selection.setActiveEntity(entity);
                this.render();
            }
        }, this)


        this._emitter.on('redraw', () => {
            this.render();
        })

        Events.on('updateActiveEntity', () => {
            //this.update();
            const transform = Selection.activeEntity.transform as Transform2D;
            computeTransform2D(transform);
            transform.matrix.concat(this._view.camera.matrix);
            this.render();
        })

        this._editorInput.init();
        this.update();
    }

    public get renderer(): Renderer {
        return this._renderer;
    }

    resize(width: number, height: number) {
        DOOM.updater.mutate(() => {
        this._renderer.resize(width, height);
        this._editorInput.resize();
        this._view.resize(width, height);
        this.update();
        });
       
        this.render();

    }

    private update() {
        this._view.updateTransform();
        this._guides.update(this._view);
        for (let i = 0; i < list.length; i++) {
            computeTransform2D(list[i].transform as Transform2D);
            list[i].transform.matrix.concat(this._view.camera.matrix);
        }
    }


    private render() {

        if (this._painting === true) 
            return;

        this._painting = true;

        DOOM.updater.mutate(() => {
            console.log("render")

            const ctx = this._renderer.context as CanvasRenderingContext2D;


            // scene
            this._renderer.beginDraw();

            this._guides.render(this.draw, this._view);

            for (let i = 0; i < list.length; i++) {



                let color = 'blue';


                renderRect(ctx, list[i], color);
            }

            const inv = this._view.camera.handlesMatrix.a;


            ctx.setTransform(
                inv[0], inv[1],
                inv[3], inv[4],
                inv[6],
                inv[7]
            );

            this._handles.render(this.draw);

            ctx.setTransform(
                1, 0,
                0, 1,
                0.5,
                0.5
            );

            if (Pointer.mode === PointerMode.ViewSelectionArea) {


                if (this._selectionArea.xMax > this._renderer.width) {
                    this._selectionArea.xMax = this._renderer.width - 1;
                } else if (this._selectionArea.xMax < 0) {
                    this._selectionArea.xMax = 0;
                }

                if (this._selectionArea.yMax > this._renderer.height) {
                    this._selectionArea.yMax = this._renderer.height - 1;
                } else if (this._selectionArea.yMax < 0) {
                    this._selectionArea.yMax = 0;
                }

                this.draw.rect(this._selectionArea.x, this._selectionArea.y, this._selectionArea.width, this._selectionArea.height, 'rgba(33, 69, 128, 0.2)');
                this.draw.outlineRect(this._selectionArea.x, this._selectionArea.y, this._selectionArea.width, this._selectionArea.height, 'rgb(33, 69, 128)', 1)


            }

            this._renderer.endDraw();
            this._painting = false;
        });
    }

}