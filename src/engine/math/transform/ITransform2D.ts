import Vector2 from '../Vector2';
import Matrix3 from '../Matrix3';

export default interface ITransform2D {
  /**
   * The resultant matrix of the transform
   */
  readonly matrix: Matrix3;

  /**
   * The position in world space
   */
  position: Vector2;
  /**
   * The scale of transform
   */
  scale: Vector2;

  /**
   * The rotation as euler angle
   */
  angle: number;

  /**
   * The radian rotation
   */
  rotation: number;

  /**
   * The radian rotation
   */
  //readonly oldRotation: number;

  /**
   * If the current transform should be recalculated
   */
  readonly isDirty: boolean;
}
