import Vector2 from '../Vector2';
import { IBounds2D } from './interfaces';

export default class Bounds2D implements IBounds2D {
  min: Vector2;
  max: Vector2;

  constructor(
    x?: number | Bounds2D,
    y?: number,
    width?: number,
    height?: number
  ) {
    this.min = new Vector2();
    this.max = new Vector2();

    if (x instanceof Bounds2D) {
      this.min.copy(x.min);
      this.max.copy(x.max);
    } else {
      x = x || Infinity;
      y = y || Infinity;
      width = width || -Infinity;
      height = height || -Infinity;

      this.min.x = x;
      this.min.y = y;
      this.max.x = width;
      this.max.y = height;
    }
  }

  get center() {
    return new Vector2(
      (this.max.x - this.min.x) / 2,
      (this.max.y - this.min.y) / 2
    );
  }

  get size() {
    return new Vector2(this.max.x - this.min.x, this.max.y - this.min.y);
  }

  set(minX, minY, maxX, maxY) {
    this.min.set(minX, minY);
    this.max.set(maxX, maxY);
    //this.box.set(this.min.x,this.min.y,this.max.x-this.min.x,this.max.y-this.min.y);
    return this;
  }

  setMin(minX, minY) {
    this.min.x = minX;
    this.min.y = minY;
    return this;
  }

  setMax(maxX, maxY) {
    this.max.x = maxX;
    this.max.y = maxY;
    return this;
  }

  move(x: number, y: number) {
    this.min.x += x;
    this.min.y += y;
    this.max.x += x;
    this.max.y += y;
  }

  intersects(bounds: Bounds2D) {
    return (
      (this.max.x >= bounds.min.x &&
        this.max.y >= bounds.min.y &&
        this.min.x <= bounds.max.x &&
        this.min.y <= bounds.max.y) ||
      (this.min.x >= bounds.max.x &&
        this.min.y >= bounds.max.y &&
        this.max.x <= bounds.min.x &&
        this.max.y <= bounds.min.y)
    );
  }

  contains(x: number, y: number) {
    return x > this.min.x && y > this.min.y && x < this.max.x && y < this.max.y;
  }

  expand(xRadius: number, yRadius?: number) {
    yRadius = yRadius || xRadius;

    if (this.max.x > this.min.x) {
      this.min.x -= xRadius;
      this.max.x += xRadius;
    } else {
      this.min.x += xRadius;
      this.max.x -= xRadius;
    }

    if (this.max.y > this.min.y) {
      this.min.y -= yRadius;
      this.max.y += yRadius;
    } else {
      this.min.y += yRadius;
      this.max.y -= yRadius;
    }
    return this;
  }

  decrease(xRadius: number, yRadius?: number) {
    return this.expand(-xRadius, -yRadius);
  }

  merge(value: Bounds2D | Vector2 | number): Bounds2D {
    // merge with another bounds
    if (value instanceof Bounds2D) {
      this.min.x = Math.min(this.min.x, value.min.x);
      this.min.y = Math.min(this.min.y, value.min.y);
      this.max.x = Math.max(this.max.x, value.max.x);
      this.max.y = Math.max(this.max.y, value.max.y);
      return this;
    } else if (value instanceof Vector2) {
      return this.mergeWithPoint(value.x, value.y);
    } else {
      this.min.x = Math.min(this.min.x, value);
      this.min.y = Math.min(this.min.y, value);
      this.max.x = Math.max(this.max.x, value);
      this.max.y = Math.max(this.max.y, value);
      return this;
    }
  }

  mergeWithPoint(x: number, y: number) {
    this.min.x = Math.min(this.min.x, x);
    this.min.y = Math.min(this.min.y, y);
    this.max.x = Math.max(this.max.x, x);
    this.max.y = Math.max(this.max.y, y);
    return this;
  }

  extend(bounds: Bounds2D) {
    // min merge
    if (bounds.min.x < this.min.x) this.min.x = bounds.min.x;

    if (bounds.min.y < this.min.y) this.min.y = bounds.min.y;

    // max merge
    if (bounds.max.x > this.max.x) this.max.x = bounds.max.x;

    if (bounds.max.y > this.max.y) this.max.y = bounds.max.y;

    return this;
  }

  extendByPoint(x: number, y: number) {
    if (x < this.min.x) this.min.x = x;
    if (y < this.min.y) this.min.y = y;
    if (x > this.max.x) this.max.x = x;
    if (y > this.max.y) this.max.y = y;

    return this;
  }

  limit(xmin: number, ymin: number, xmax: number, ymax: number) {
    if (this.min.x < xmin) this.min.x = xmin;

    if (this.min.y < ymin) this.min.y = ymin;

    if (this.max.x > xmax) this.max.x = xmax;

    if (this.max.y > ymax) this.max.y = ymax;
  }

  offset(x: number, y: number): IVector2 {
    let o = {
      x: x,
      y: y,
    };
    o.x -= this.min.x;
    o.y -= this.min.y;

    if (this.max.x > this.min.x) o.x /= this.max.x - this.min.x;

    if (this.max.y > this.min.y) o.y /= this.max.y - this.min.y;

    return o;
  }

  toString(): string {
    return (
      '{ min: ' + this.min.toString() + ', max: ' + this.max.toString() + ' }'
    );
  }

  copy(bounds: IBounds2D): Bounds2D {
    this.min.copy(bounds.min);
    this.max.copy(bounds.max);
    return this;
  }
}
