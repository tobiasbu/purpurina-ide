

import MathUtils from './MathUtils';

/**
* Class for points and vectors.
* @class Vector2
* @constructor
*/
export default class Vector2 implements IVector2 {

    x: number;
    y: number;

    get magnitude(): number { return Math.sqrt((this.x * this.x) + (this.y * this.y)); }
    get normal(): Vector2 {
        let mag = this.magnitude;
        let vec = new Vector2(this.x / mag, this.y / mag);
        return vec;
    }

    constructor(x?: number, y?: number) {
        this.x = x || 0;
        this.y = y || 0;
    }

    set(x: number, y: number): Vector2 {
        this.x = x;
        this.y = y || x;
        return this;
    }

    move(x: number, y: number): Vector2 {
        this.x += x;
        this.y += y;
        return this;
    }

    scale(x: number, y?: number): Vector2 {
        this.x *= x;
        this.y *= y || x;
        return this;

    }

    rotate(radians): Vector2 {
        let x = this.x;
        let y = this.y;
        this.x = x * Math.cos(radians) - y * Math.sin(radians);
        this.y = x * Math.sin(radians) + y * Math.cos(radians);
        return this;

    }

    rotateAround(radians: number, other: IVector2): Vector2 {

        /*var x = this.x;
        var y = this.y;*/
        let dx = this.x - other.x;
        let dy = this.y - other.y;

        let c = Math.cos(radians);
        let s = Math.sin(radians);

        /*this.x = c * (x-other.x) - s * (y-other.y) + other.x;
        this.y = s * (x-other.x) + c * (y-other.y) + other.y;*/

        this.x = other.x + (c * dx - s * dy);
        this.y = other.y + (s * dx + c * dy);
        return this;

    }

    copy(otherVector: IVector2): Vector2 {
        this.x = otherVector.x;
        this.y = otherVector.y;
        return this;

    }

    normalize(): Vector2 {
        let mag = this.length();
        if (mag > 0) {
            this.x = this.x / mag;
            this.y = this.y / mag;
        }
        return this;
    }

    round(): Vector2 {
        this.x = MathUtils.round(this.x);
        this.y = MathUtils.round(this.y);
        return this;
    }

    reverse(): Vector2 {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }

    add(other: IVector2): Vector2 {
        this.x += other.x;
        this.y += other.y;
        return this;
    }

    sub(other: IVector2): Vector2 {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    }

    perp(): Vector2 {
        let x = this.x;
        this.x = this.y;
        this.y = -x;
        return this;
    }

    dot(other: IVector2): number {
        return Vector2.dot(this, other);
    }

    project(other: IVector2): Vector2 {
        return Vector2.project(this, other);
    }

    clone(): Vector2 {
        return new Vector2(this.x, this.y);
    }

    length(): number {
        return Math.sqrt(this.squaredLenght());
    }

    toString(): string {
        return "{ x: " + this.x + ", y: " + this.y + " }"
    }

    squaredLenght(): number {
        return Vector2.dot(this, this);
    }

    static abs(vector: IVector2): Vector2 {
        return new Vector2(Math.abs(vector.x), Math.abs(vector.y));
    }

    static scalar(a: IVector2, b: IVector2): number {
        return a.x * b.y - a.y * b.x;
    }

    static distance(a: IVector2, b: IVector2): number {
        return MathUtils.distance(a.x, a.y, b.x, b.y);
    }

    static angleBetween(a: IVector2, b: IVector2): number {
        return MathUtils.angleBetween(a.x, a.y, b.x, b.y);
    }

    static dot(a: IVector2, b: IVector2): number {
        return (a.x * b.x) + (a.y * b.y);
    }

    static project(a: IVector2, b: IVector2): Vector2 {
        let dp = Vector2.dot(a, b);
        var proj = new Vector2(
            (dp / (b.x * b.x + b.y * b.y)) * b.x,
            (dp / (b.x * b.x + b.y * b.y)) * b.y
        );
        return proj;
    };

    // project for unit vector
    static projectNormal(a: IVector2, b: IVector2): Vector2 {
        let dp = Vector2.dot(a, b);
        let proj = new Vector2(dp / b.x, dp / b.y);
        return proj;
    };

    static reflect(vec: IVector2, axis: IVector2): Vector2 {
        let r = Vector2.project(vec, axis);
        r.scale(2);
        r.sub(vec);
        return r;
    };

    static reflectNormal(vec: IVector2, axis: IVector2): Vector2 {
        let r = Vector2.projectNormal(vec, axis);
        r.scale(2);
        r.sub(vec);
        return r;
    };

    static lerp(a: IVector2, b: IVector2, t: number): Vector2 {
        let vec = new Vector2(
            MathUtils.lerp(a.x, b.x, t),
            MathUtils.lerp(a.y, b.y, t)
        );
        return vec;
    }
}
