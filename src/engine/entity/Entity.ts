//import EntityHierarchy from './EntityHierarchy'
import Transform2D from "../math/transform/Transform2D";
// import ModuleManager from '../modules/ModuleManager';
import EntityBase from "./EntityBase";
import ITransform2D from "../math/transform/ITransform2D";

export default class Entity extends EntityBase //Hierarchy {
  protected _transform: ITransform2D;
  private _pool = null;
  private _pendingRemoval: boolean;

  get isPooled(): boolean {
    return this._pool !== null;
  }

  public get pendingRemoval(): boolean {
    return this._pendingRemoval;
  }

  public get transform(): ITransform2D {
    return this._transform;
  }

  constructor(name: string) {
    super(name);
    this._transform = new Transform2D();

    //this.modules = new ModuleManager(this);
    //this.scene = null;
    this._pendingRemoval = false;
  }

  /**
   * If the object is pooled, send back to his pool.
   * @returns {boolean} True if the object was sent to pool, otherwise false.
   */
  // back(): boolean {
  //     if (this.isPooled) {

  //         if (this.scene !== null) {
  //             this._pendingRemoval = true;
  //             return this.game.system.pool.push(this);
  //         } else {
  //             return false;
  //         }

  //     } else {
  //         return false;
  //     }
  // }

  // set x(value) {
  //     this._transform.position.x = value;
  //     this._transform.markDirty();
  // }

  // get x() { return this._transform.position.x; }

  // set y(value) {
  //     this._transform.position.y = value;
  //     this._transform.markDirty();
  // }

  // get y() { return this._transform.position.y; }

  // get position() { return this._transform.position; }
  // set position(value) { this._transform.position = value; this._transform._isDirty = true; }

  // get origin() { return this._transform.origin; }
  // set origin(value) { this._transform.origin = value; this._transform._isDirty = true; }
  // // set ['origin.x'](value) { this._transform.origin.x = value; this._transform._isDirty = true;}
  // // set ['origin.y'](value) { this._transform.origin.y = value; this._transform._isDirty = true;}

  // get scale() { return this._transform.scale; }
  // set scale(value) { this._transform.scale = value; this._transform._isDirty = true; }
  // set ['scale.x'](value) { this._transform.scale.x = value; this._transform._isDirty = true;}
  // set ['scale.y'](value) { this._transform.scale.y = value; this._transform._isDirty = true;}

  // get angle() { return this._transform.angle; }
  // set angle(value) { this._transform.angle = value; this._transform._isDirty = true; }
}
