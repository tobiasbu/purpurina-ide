import Matrix3 from "../../engine/math/Matrix3";
import ManagedVector2 from "../../engine/math/ManagedVector2";
import Bounds2D from "../../engine/math/bounds/Bounds2D";
import Vector2 from "../../engine/math/Vector2";
import IRenderer from "../renderer/IRenderer";
import MathUtils from "../../engine/math/MathUtils";

export default class EditorCamera {
    private _renderer: IRenderer;
    private _matrix: Matrix3;
    private _position: ManagedVector2;
    private _lastZoomOffset: IVector2;
    private _oldPosition: Vector2;
    private _resolution: number;
    private _viewBounds: Bounds2D;
    private _inversedMatrix: Matrix3;
    private _maxZoom: number = 10;
    private _minZoom: number = 0.00125;
    private _zoomDelta: number = 0.025;
    private _origin: IVector2;

    private _invertedResolution: number;
    origin: number;

    public get resolution(): number {
        return this._resolution;
    }

    public get matrix(): Matrix3 {
        return this._matrix;
    }

    public get inversedMatrix(): Matrix3 {
        return this._inversedMatrix;
    }

    public get position(): Vector2 {
        return this._position;
    }


    constructor(renderer: IRenderer) {
        this._renderer = renderer;
        this._position = new ManagedVector2(0, 0);
        this._oldPosition = new Vector2();
        this._matrix = Matrix3.identity();
        this._inversedMatrix = Matrix3.identity();
        this._resolution = 1;
        this._invertedResolution = 1 / this._resolution;
        this._viewBounds = new Bounds2D();
        this._origin = { x: 0.5, y: 0.5 };

        this._lastZoomOffset = {
            x: 0,
            y: 0
        }

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

        this.prepareMove();

        zoomPoint.x = zoomPoint.x * this._renderer.width;
        zoomPoint.y = zoomPoint.y * this._renderer.height;


        // var diff = {
        //      x: zoomPoint.x - (this._renderer.width / 2),
        //      y: zoomPoint.y - (this._renderer.height / 2)
        //     }


        this._oldPosition.copy(this._position);
        zoomPoint = this.screenPointToWorld(zoomPoint.x, zoomPoint.y);
        zoomPoint = Matrix3.inverse(this._matrix).transformPoint(zoomPoint.x, zoomPoint.y);

        const scaleChange = res - this._resolution;
        const offsetX = -(zoomPoint.x * scaleChange);
        const offsetY = -(zoomPoint.y * scaleChange);

        this._position.x += offsetX;
        this._position.y += offsetY;
        // this._position.x -= this._oldPosition.x;
        // this._position.y -= this._oldPosition.y;

        this._resolution = res;
        this._invertedResolution = 1 / res;


    }

    prepareMove() {
        this._oldPosition.copy(this._position);
    }

    move(position: IVector2) {
        this._position.x = this._oldPosition.x - position.x * this._invertedResolution;
        this._position.y = this._oldPosition.y - position.y * this._invertedResolution;
        //this._lastZoomOffset.x = position.x;
        //this._lastZoomOffset.y = position.y;
    }

    setPosition(position: IVector2) {
        this._position.x = position.x * this._resolution;
        this._position.y = position.y * this._resolution;
    }

    updateTransform() {

        //const originX = this._renderer.width * this._origin.x;
        //const originY = this._renderer.height * this._origin.y;
        // const pos = {
        //     x: this._position.x,
        //     y: this._position.y 
        // }

        // this._matrix.setIdentity()
        //     .scale(this._resolution, this._resolution)
        //     .translate(-this._position.x, -this._position.y)
        //     .translate(originX * this._invertedResolution, originY * this._invertedResolution);


        // this._inversedMatrix.setIdentity()
        //     .translate(-this._position.x * this._invertedResolution, -this._position.y * this._invertedResolution)
        //     .translate(originX * this._invertedResolution, originY * this._invertedResolution);


        this._matrix.setIdentity()
           
            //.translate(-this._position.x, -this._position.y)
            .scale(this._resolution, this._resolution)
            .translate(-this._position.x, -this._position.y)

        this._inversedMatrix.setIdentity()
            .translate(-this._position.x * this._resolution, -this._position.y * this._resolution)

        //.translate(originX, originY);

        //factor.x = factor.x - (this._position.x * this._invertedResolution);

        // + this._invertedResolution;// + this._resolution ;// * (this._resolution - this._invertedResolution);
        //factor *= this._invertedResolution - this._resolution;

        //const diff = this._position.x * (this._invertedResolution - this._resolution);

        //let vec = this._matrix.transformPoint(this._position.x * this._invertedResolution, this._position.y * this._invertedResolution);

        // this._inversedMatrix.setIdentity()
        //     .translate(this.position.x * this._resolution, this.position.y * this._resolution)
        //.scale(this._invertedResolution, this._invertedResolution)
        //this._inversedMatrix.scale(this._resolution,this._resolution )

        //.scale(this._invertedResolution, this._invertedResolution)
        //.translate(this._position.x + diff, this._position.y * this._resolution)
        //.scale(this._resolution, this._resolution)
        //.translate(this._position.x * this._invertedResolution, this._position.y * this._invertedResolution)

        // this._inversedMatrix.setModelMatrix({
        //     x: this._position.x * factor,
        //     y: this._position.y * factor
        // }, { x: 1, y: 1 }, { x: 1, y: 0 })
        //.scale(this._resolution, this._resolution)
        //.scale(this._invertedResolution, this._invertedResolution);


    }

    screenPointToWorld(x: number, y: number):Vector2 {

        let result = new Vector2(x,y);
        let det = Matrix3.determinant2D(this._matrix);

        if (!det) {
            return result;
        }

        // inverse determinant
        det = 1 / det;

        // inverse matrix
        const m = this._matrix.a;

        let a =  m[4] * det;
        let b = -m[1] * det;
        let c = -m[3] * det;
        let d =  m[0] * det;
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