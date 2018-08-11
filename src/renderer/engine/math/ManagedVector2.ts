import Vector2 from "./Vector2";


export default class ManagedVector2 extends Vector2 implements IVector2 {

    private markDirty;
    x: number;
    y: number;


    constructor(x: number, y: number, managed?: () => void) {
        super(x, y)
        this.markDirty = managed || undefined;
    }

    set(x: number, y: number): Vector2 {
        super.set(x, y);
        if (this.markDirty !== undefined)
            this.markDirty();
        return this;
    }

    move(x: number, y: number): Vector2 {
        super.move(x, y);
        if (this.markDirty !== undefined)
            this.markDirty();
        return this;
    }

    scale(x: number, y?: number): Vector2 {
        super.scale(x, y);
        if (this.markDirty !== undefined)
            this.markDirty();
        return this;

    }

    rotate(radians): Vector2 {
        super.rotate(radians);
        if (this.markDirty !== undefined)
            this.markDirty();
        return this;

    }

    rotateAround(radians: number, other: IVector2): Vector2 {
        super.rotateAround(radians, other);
        if (this.markDirty !== undefined)
            this.markDirty();
        return this;
    }

    copy(otherVector: IVector2): Vector2 {
        super.copy(otherVector);
        if (this.markDirty !== undefined)
            this.markDirty();
        return this;
    }

    normalize(): Vector2 {
        super.normalize();
        if (this.markDirty !== undefined)
            this.markDirty();
        return this;
    }

    round(): Vector2 {
        super.round();
        if (this.markDirty !== undefined)
            this.markDirty();
        return this;
    }

    reverse(): Vector2 {
        super.reverse();
        if (this.markDirty !== undefined)
            this.markDirty();
        return this;
    }

    add(other: IVector2): Vector2 {
        super.add(other);
        if (this.markDirty !== undefined)
            this.markDirty();
        return this;
    }

    sub(other: IVector2): Vector2 {
        super.sub(other);
        if (this.markDirty !== undefined)
            this.markDirty();
        return this;
    }

    perp(): Vector2 {
        super.perp();
        if (this.markDirty !== undefined)
            this.markDirty();
        return this;
    }

}