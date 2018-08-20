import Matrix3 from "../../engine/math/Matrix3";
import Vector2 from "../../engine/math/Vector2";
import IRenderer from "../../engine/renderer/IRenderer";
import MathUtils from "../../engine/math/MathUtils";

export default class EditorCamera {

    private _matrix: Matrix3;
    private _position: Vector2;
    //private _lastZoomOffset: IVector2;
    private _oldPosition: Vector2;
    private _resolution: number;

    //private _viewBounds: Bounds2D;
    private _handlesMatrix: Matrix3;
    private _maxZoom: number = 10;
    private _minZoom: number = 0.05;
    private _zoomDelta: number = 0.0125; // //0.00625;
    private

    private _invertedResolution: number;
    private _originFactor: number = 0.5;
    private _origin: Vector2;


    _renderer: IRenderer;
    aspectRatio: number;
    invAspect: number;

    public get resolution(): number {
        return this._resolution;
    }

    public get matrix(): Matrix3 {
        return this._matrix;
    }

    public get handlesMatrix(): Matrix3 {
        return this._handlesMatrix;
    }

    public get position(): Vector2 {
        return this._position;
    }

    public get invertedResolution(): number {
        return this._invertedResolution;
    }

    public get offsetX(): number {
        return -this._position.x * this._resolution + this.origin.x;
    }

    public get offsetY(): number {
        return -this._position.y * this._resolution + this.origin.y;
    }

    public get zoomFactor(): number {
        return (this._resolution - this._minZoom) / (this._maxZoom - this._minZoom);
    }

    public get origin(): Vector2 {
        return this._origin;
    }

    constructor(renderer: IRenderer) {
        this._renderer = renderer;
        this._position = new Vector2(0, 0);
        this._oldPosition = new Vector2();
        this._origin = new Vector2();

        this._matrix = Matrix3.identity();
        this._handlesMatrix = Matrix3.identity();
        this._resolution = 1;
        this._invertedResolution = 1 / this._resolution;

        //this._viewBounds = new Bounds2D();
        this.resize();
        this.updateTransform();
    }

    zoom(delta: number, zoomPoint: IVector2) {
        let res = this._resolution;
        const scaleDelta = delta * this._zoomDelta;
        res = res + scaleDelta;

        if (res > this._maxZoom) {
            res = this._maxZoom;
        } else if (res < this._minZoom) {
            res = this._minZoom;
        }


        // determine the point on where the slide is zoomed in
        let zoom_target = { x: 0, y: 0 };
        zoom_target.x = (zoomPoint.x - this._position.x) / this._resolution;
        zoom_target.y = (zoomPoint.y - this._position.y) / this._resolution;



        // calculate x and y based on zoom
        //this._position.x = -zoom_target.x * res + zoomPoint.x
        //this._position.x = -zoom_target.y * res + zoomPoint.y
        //this._position.x -= originX * this._invertedResolution;
        //this._position.x -= originY * this._invertedResolution

        //this._position.x -= zoomPoint.x/(this._resolution*res) - zoomPoint.x/this._resolution;
        //this._position.y -= zoomPoint.y/(this._resolution*res) - zoomPoint.y/this._resolution;


        // const offsetX = -(zoomPoint.x * scaleChange) / this._resolution;
        // const offsetY = -(zoomPoint.y * scaleChange) / this._resolution;

        // this._position.x += offsetX;
        // this._position.y += offsetY;


        zoomPoint.x -= this.origin.x;
        zoomPoint.y -= this.origin.y;

        this._position.x -= (zoomPoint.x / res) - (zoomPoint.x / this._resolution);
        this._position.y -= (zoomPoint.y / res) - (zoomPoint.y / this._resolution);

        // apply zoom
        this._resolution = res;
        this._invertedResolution = 1 / res;



    }

    prepareMove() {
        this._oldPosition.copy(this._position);
    }

    move(position: IVector2) {
        this._position.x = this._oldPosition.x - (position.x * this._invertedResolution);
        this._position.y = this._oldPosition.y - (position.y * this._invertedResolution);
        //this._lastZoomOffset.x = position.x;
        //this._lastZoomOffset.y = position.y;
    }

    setPosition(position: IVector2) {
        this._position.x = position.x * this._resolution;
        this._position.y = position.y * this._resolution;
    }

    resize() {
        const originX = this._renderer.width * this._originFactor;
        const originY = this._renderer.height * this._originFactor;
        this._origin.x = originX;
        this._origin.y = originY;
    }

    updateTransform() {

        this.aspectRatio = this._renderer.width / this._renderer.height;


        const a = 1 / this.aspectRatio;
        this.invAspect = a;


        this._matrix.setIdentity()
            //.translate(this._position.x, this._position.y) // translate
            // center the view port to origin
            //



            .translate(
                this.origin.x * this.invertedResolution * a,
                this.origin.y * this.invertedResolution * a)
            .translate(-this._position.x * a, -this._position.y * a)
            .scale(this._resolution, this._resolution)
            .scale(this.aspectRatio, this.aspectRatio)



        //.translate(-originX * this._invertedResolution, -originY * this._invertedResolution)

        this._handlesMatrix.setIdentity()

        //.scale(this.aspectRatio, this.aspectRatio)
            .translate(
                MathUtils.round(this.origin.x),
                MathUtils.round(this.origin.y))
            .translate(
                MathUtils.round(-this._position.x * this._resolution) + 0.5,
                MathUtils.round(-this._position.y * this._resolution) + 0.5)
          //      .scale(a, a)
            
            



        // this._matrix.setIdentity()
        // .translate(-this._position.x, -this._position.y)
        //     .scale(this._resolution, this._resolution)
        //     .translate(-this._position.x, -this._position.y)

        // this._handlesMatrix.setIdentity()
        //     .translate(
        //         this._position.x * this._resolution,
        //         this._position.y * this._resolution)
        //     .translate(originX, originY)

        //.translate(this._position.x, this._position.y)
        //.translate(originX * this._invertedResolution, originY * this._invertedResolution)


    }

    screenPointToWorld(x: number, y: number): Vector2 {

        let result = new Vector2(x, y);
        let det = Matrix3.determinant2D(this._matrix);

        if (!det) {
            return result;
        }

        // inverse determinant
        det = 1 / det;

        // inverse matrix
        const m = this._matrix.a;

        let a = m[4] * det;
        let b = -m[1] * det;
        let c = -m[3] * det;
        let d = m[0] * det;
        let e = (m[3] * m[7] - m[4] * m[6]) * det;
        let f = (m[1] * m[6] - m[0] * m[7]) * det;

        let cos = Math.cos(MathUtils.degtorad * 0);
        let sin = Math.sin(MathUtils.degtorad * 0);

        let scaledX = x * this._resolution + (this._position.x * cos - this._position.y * sin);
        let scaledY = y * this._resolution + (this._position.x * sin + this._position.y * cos);

        result.x = (scaledX * a + scaledY * c + e);
        result.y = (scaledX * b + scaledY * d + f);

        return result;
    }


}