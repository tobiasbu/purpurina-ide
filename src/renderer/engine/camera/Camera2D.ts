import Transform2D from "../math/transform/Transform2D";
import Bounds2D from "../math/bounds/Bounds2D";
import IRenderer from "../../internal/renderer/IRenderer";
import Color from "../render/color/Color";
import { IColor } from "../render/color/IColor";
import ICamera2D from "./ICameraImpl";
import Rect from "../math/Rect";
import MathUtils from "../math/MathUtils";

export default class Camera2D implements ICamera2D {

    viewPort: Rect;
    resolution: number;

    private _renderer: IRenderer;
    private _transform: Transform2D;
    private _aspectRatio: number;
    private _viewBounds: Bounds2D;
    private _roundPixels: boolean;
    private _backgroundColor: Color;

    public get transform(): Transform2D {
        return this._transform;
    }

    public get aspectRatio(): number {
        return this._aspectRatio;
    }

    public get renderer(): IRenderer {
        return this._renderer;
    }

    public get viewBounds(): Bounds2D {
        return this._viewBounds;
    }

    public get roundPixels(): boolean {
        return this._roundPixels;
    }
    public set roundPixels(value: boolean) {
        if (this._roundPixels !== value) {
            this._roundPixels = value;
            this._transform.markDirty();
        }
    }

    public get backgroundColor(): Color {
        return this._backgroundColor;
    }

    public set backgroundColor(value: Color) {
        this._backgroundColor.set(value);
    }

    constructor(renderer: IRenderer) {

        this._renderer = renderer;


        // this.width = game.config.camera.width;
        // this.height = game.config.camera.height;
        this._aspectRatio = renderer.DOMCanvas.width / renderer.DOMCanvas.height;

        //   this._bounds = new Bounds2D(); // render bounds
        this._viewBounds = new Bounds2D(0, 0, renderer.DOMCanvas.width, renderer.DOMCanvas.height); // global bounds
        this._transform = new Transform2D();
        this._backgroundColor = new Color();

        // this._pixelUnit = { x: 1, y: 1 };


        // this._backgroundColor = new Color(); //.rgbToHex(0,0,0);
        // this._roundPixels = game.config.roundPixels;

    }

    updateTransform() {
        if (this._transform.isDirty === false)
            return;

        let t = this.transform;


        if (t.rotation !== t._oldRotation) {
            t._oldRotation = t.rotation;
            t._cosSin.y = Math.sin(t.rotation);
            t._cosSin.x = Math.cos(t.rotation);
        }

        // let origin = {
        //     x: camera.width * t.origin.x,
        //     y: camera.height * t.origin.y
        // };

        let pos = {
            x: t.position.x,// + origin.x),
            y: t.position.y// + origin.y)
        };

        if (this._roundPixels) {
            pos.x = MathUtils.round(pos.x);
            pos.y = MathUtils.round(pos.y);
        }

        // update camera view
        this.viewBounds
            .setMin(pos.x, pos.y)
            .setMax(pos.x + camera.width, pos.y + camera.height);

        pos.x = -pos.x;
        pos.y = -pos.y;

        // compute the basic rotation
        t.matrix.setIdentity()
            .scale(camera._pixelUnit.x, camera._pixelUnit.y) // resolution
            .translate(pos.x, pos.y)
            .scale(t.scale.x, t.scale.x);

        // bounds should not be rotated
        ComputeBounds(
            camera.bounds, camera._transform,
            camera.width, camera.height,
            pos);

        t.matrix
            .radianRotate(t._cosSin.x, t._cosSin.y)
            .translate(-origin.x, -origin.y);
    }

    resize(width: number, height: number) {
        throw new Error("Method not implemented.");
    }


    // get position() { 
    //   return this._transform.position; 
    // }
    // set position(value) { 
    //   this._transform.position.x = value.x;
    //   this._transform.position.y = value.y; 
    //   this._transform._isDirty = true;
    //   return this;
    // }
    // get x() {return this._transform.position.x;}
    // set x(value) { 
    //   this._transform.position.x = value; 
    //   this._transform._isDirty = true;
    //   return this;
    // }

    // get y() {return this._transform.position.y;}
    // set y(value) { 
    //   this._transform.position.y = value; 
    //   this._transform._isDirty = true;
    //   return this;
    // }

    // get scale() { return this._transform.scale.x; }
    // set scale(value) { 
    //   this._transform.scale.x = value; 
    //   this._transform._isDirty = true; 
    //   return this;
    // }

    // get angle() { return this._transform.angle; }
    // set angle(value) { 
    //   this._transform.angle = value; 
    //   this._transform.rotation = value * MathUtils.toRadian;
    //   this._transform._isDirty = true;
    //   return this;
    // }

    // get origin() { return this._transform.origin; }
    // set origin(value) {
    //   this._transform.x = value.x;
    //   this._transform.y = value.y;
    //   this._transform._isDirty = true;
    //   return this;
    // }

    // get rotation() { return this._transform.rotation; }

    // set backgroundColor(color) {
    //     if (color === undefined) { color = 'rgba(0,0,0,0)'; }
    //     this._backgroundColor = color;
    //     return this;
    // }
    // get backgroundColor() {
    //     return this._backgroundColor = color;
    // }

    // get size() {
    //     return { x: this.width, y: this.height };
    // }

    // centerView() {
    //     this.x = this.width * 0.5;
    //     this.y = this.height * 0.5;
    //     this._transform._isDirty = true;
    //     return this;
    // }

    // centerToEntity(entity) {
    //     this.x = entity.position.x;
    //     this.y = entity.position.y;
    //     this._transform._isDirty = true;
    //     return this;
    // }

    setBackgroundColor(color: IColor | string | number) {
        this._backgroundColor.set(color);
        return this;
    }

    // setSize(width, height) {
    //     ResizeCamera(this, this.canvas, width, height);
    //     this._transform._isDirty = true;
    //     return this;
    // }

    // setView(x, y, width, height) {
    //     this._transform.position.x = x;
    //     this._transform.position.y = y;
    //     ResizeCamera(width, height);
    //     this._transform._isDirty = true;
    //     return this;
    // }

    reset() {
        this._transform.reset();
    }

    // isCulled(entity) {

    //     if (entity === undefined || entity === null)
    //         return false;

    //     if (entity instanceof Renderable) {
    //         return this.bounds.intersects(entity.bounds);
    //     } else {
    //         let render = entity.modules.get('render');
    //         if (render !== null || render !== undefined) {
    //             return this.bounds.intersects(render.bounds);
    //         } else {
    //             return this.bounds.contains(entity.x, entity.y);
    //         }
    //     }

    // }

}

// System.register('Camera', Camera, 'camera', function () {
//     this.canvas = this.game.system.render.canvas;
//     ResizeCamera(this, this.canvas, this.width, this.height);
// });