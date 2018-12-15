import EditorCamera from "./EditorCamera";
import Vector2 from "../../../engine/math/Vector2";

export default class View {

    private _camera: EditorCamera;
    private _origin: IVector2;
    private _originFactor: number = 0.5;
    private _aspectRatio: number;
    private _invAspectRatio: number;
    private _maxZoom: number = 10;
    private _minZoom: number = 0.01;
    private _zoomDelta: number = 0.035;
    private _oldPosition: Vector2;
    private _size: Vector2;
    

    public get camera(): EditorCamera {
        return this._camera;
    }

    public get origin(): IVector2 {
        return this._origin;
    }

    public get aspectRatio(): number {
        return this._aspectRatio;
    }

    public get zoomFactor(): number {
        return (this._camera.resolution - this._minZoom) / (this._maxZoom - this._minZoom);
    }

    public get size(): IVector2 {
        return this._size;
    }

    constructor() {
        this._oldPosition = new Vector2();
        this._camera = new EditorCamera(1);
        this._origin = new Vector2();
        this._size = new Vector2();
    }


    zoom(delta: number, zoomPoint: IVector2) {

        let newRes = this._camera.resolution;
        let oldRes = this._camera.resolution;
        let scaleDelta;

        if (newRes <= 0.1) {
            scaleDelta = delta * newRes * this._zoomDelta;// (this._zoomDelta * res);
        } else {
            scaleDelta = delta * newRes * this._zoomDelta;
        }

        newRes = newRes + scaleDelta;

        if (newRes > this._maxZoom) {
            newRes = this._maxZoom;
        } else if (newRes < this._minZoom) {
            newRes = this._minZoom;
        }

        zoomPoint.x -= this.origin.x;
        zoomPoint.y -= this.origin.y;

        const newFactor = newRes * this.aspectRatio;
        const oldFactor = oldRes * this.aspectRatio;

        const position = this._camera.position;

        // offset camera to zoom point
        position.x -= (zoomPoint.x / newFactor) - (zoomPoint.x / oldFactor);
        position.y -= (zoomPoint.y / newFactor) - (zoomPoint.y / oldFactor);

        this._camera.setPosition(position);

        // apply zoom
        this._camera.setResolution(newRes);
    }

    prepareMove() {
        this._oldPosition.copy(this.camera.position);
    }

    move(position: IVector2) {
        const newPosition = this._camera.position;
        newPosition.x = this._oldPosition.x - (position.x * this.camera.invertedResolution * this._invAspectRatio);
        newPosition.y = this._oldPosition.y - (position.y * this.camera.invertedResolution * this._invAspectRatio);
    }


    resize(width: number, height: number) {
        const originX = width * this._originFactor;
        const originY = height * this._originFactor;
        this._origin.x = originX;
        this._origin.y = originY;
        this._aspectRatio = width / height;
        this._invAspectRatio = 1 / this._aspectRatio;
        this._size.x = width;
        this._size.y = height;
    }

    updateTransform() {
        this._camera.updateTransform(this.origin, this._aspectRatio, this._invAspectRatio);
    }

}