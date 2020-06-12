import Matrix3 from '../../../engine/math/Matrix3';
import Vector2 from '../../../engine/math/Vector2';
import MathUtils from '../../../engine/math/MathUtils';

export default class EditorCamera {
  private _matrix: Matrix3;
  private _position: Vector2;
  //private _lastZoomOffset: IVector2;
  private _oldPosition: Vector2;
  private _resolution: number;

  //private _viewBounds: Bounds2D;
  private _handlesMatrix: Matrix3;
  private _invertedResolution: number;

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
    return -this._position.x * this._resolution;
  }

  public get offsetY(): number {
    return -this._position.y * this._resolution;
  }

  constructor(resolution: number) {
    this._position = new Vector2(0, 0);
    this._oldPosition = new Vector2();

    this._matrix = Matrix3.identity();
    this._handlesMatrix = Matrix3.identity();
    this.setResolution(resolution);
  }

  setPosition(position: IVector2): void {
    this._position.x = position.x;
    this._position.y = position.y;
  }

  setResolution(newResolution: number): void {
    this._resolution = newResolution;
    this._invertedResolution = 1 / newResolution;
  }

  updateTransform(
    origin: IVector2,
    aspectRatio: number,
    invAspectRatio: number
  ): void {
    this._matrix
      .setIdentity()
      // center the view port to origin
      .translate(
        origin.x * this.invertedResolution * invAspectRatio,
        origin.y * this.invertedResolution * invAspectRatio
      )
      .translate(-this._position.x, -this._position.y)
      .scale(this._resolution, this._resolution)
      .scale(aspectRatio, aspectRatio);

    const correction = this.resolution * aspectRatio;

    this._handlesMatrix
      .setIdentity()
      .translate(MathUtils.round(origin.x), MathUtils.round(origin.y))
      .translate(
        MathUtils.round(-this._position.x * correction) + 0.5,
        MathUtils.round(-this._position.y * correction) + 0.5
      );
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

    let scaledX =
      x * this._resolution + (this._position.x * cos - this._position.y * sin);
    let scaledY =
      y * this._resolution + (this._position.x * sin + this._position.y * cos);

    result.x = scaledX * a + scaledY * c + e;
    result.y = scaledX * b + scaledY * d + f;

    return result;
  }
}
