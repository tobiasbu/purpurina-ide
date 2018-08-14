
import ManagedVector2 from '../ManagedVector2';
import Matrix3 from '../Matrix3';
import ITransform2D from './ITransform2D';
import Vector2 from '../Vector2';
import MathUtils from '../MathUtils';

export default class Transform2D implements ITransform2D {


    private _matrix: Matrix3;
    private _position: ManagedVector2;
    private _scale: ManagedVector2;
    private _angle: number;
    private _rotation: number;
    private _isDirty: boolean;

    _cosSin: IVector2;
    _oldRotation: number;

    public get matrix(): Matrix3 {
        return this._matrix;
    }

    public get position(): Vector2 {
        return this._position;
    }
    public set position(value: Vector2) {
        this._position.x = value.x;
        this._position.y = value.y;
    }

    public get angle(): number {
        return this._angle;
    }
    public set angle(value: number) {
        if (this._angle !== value) {
            this._isDirty = true;
            this._angle = value;
            this._rotation = value * MathUtils.degtorad;
        }
    }

    public set rotation(value: number) {
        if (this._rotation !== value) {
            this._isDirty = true;
            this._rotation = value;
            this._angle = value * MathUtils.radtodeg;
        }
        
    }

    public get rotation(): number {
        return this._rotation;
    }

    public get isDirty(): boolean {
        return this._isDirty;
    }

    public get scale(): Vector2 {
        return this._scale;
    }

    public set scale(value: Vector2) {
        this._scale.x = value.x;
        this._scale.y = value.y;
        this._isDirty = true;
    }


    constructor() {

        this._matrix = new Matrix3(1);
        this._position = new ManagedVector2(0, 0, this.markDirty);
        this._scale = new ManagedVector2(1, 1, this.markDirty);
        // this._origin = new Vector2(0,0, this.markDirty);
        this._angle = 0;
        this._rotation = 0;
        this._cosSin = { x: 1, y: 0 };
        this._oldRotation = -1;
        this._isDirty = true;
        //this.worldPosition = new Vector2(0,0);
        //this.worldScale =  new Vector2(1,1);
        //this.worldRotation = 0;
        //this.bounds = new BoundingBox(0,0,1,1); // the full bounds of the node - defined by render
        //this.globalBounds = new BoundingBox(0,0,1,1); // defined by render
    }

    markDirty() {
        this._isDirty = true;
    }

    destroy() {

        delete this._position;
        delete this._scale;
        delete this._matrix;
        // delete this._worldPosition;
        // delete this._worldScale;
        // delete this._origin;
        // delete this._bounds;
        // delete this._globalBounds;
        delete this._cosSin;

    }

    reset() {
        this._matrix.setIdentity();
        this._isDirty = true;
        this._cosSin.x = 1;
        this._cosSin.y = 0;
        this._position.set(0, 0);
        this._angle = 0;
        this._rotation = 0;
        this._oldRotation = 0;
        // this._origin.set(0, 0);
        this._scale.set(0, 0);

    }

    
}

