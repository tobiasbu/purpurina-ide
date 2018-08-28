
/**
* @class Rect
*/
export default class Rect {

    x: number;
    y: number;
    width: number;
    height: number;

    constructor(x?: number, y?: number, width?: number, height?: number) {
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 0;
        this.height = height || 0;
    }

    get center(): IVector2 {
        let vec: IVector2 = {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2
        };

        return vec;
    }

    get xMax(): number {
        return this.x + this.width;
    }

    get yMax(): number {
        return this.y + this.height;
    }

    set xMax(value: number) {
        this.width = value - this.x;       
    }

    set yMax(value: number) {
        this.height = value - this.y;
    }

    set(x: number, y: number, width: number, height: number): Rect {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        return this;
    }

    setPostion(x: number, y: number): Rect {
        this.x = x;
        this.y = y;
        return this;
    }

    setSize(width: number, height: number): Rect {
        this.width = width;
        this.height = height;
        return this;
    }

    copy(rect: Rect): Rect {
        this.x = rect.x;
        this.y = rect.y;
        this.width = rect.width;
        this.height = rect.height;
        return this;
    }


    intersects(rect: Rect): boolean {
        return Rect.intersects(this, rect);
    }

    contains(x: number, y: number): boolean {
        return Rect.contains(this, x, y);
    }

    area() {
        return this.width * this.height;
    }

    static intersects(rect1: Rect, rect2: Rect): boolean {

        if (rect1.width <= 0 || rect1.height <= 0 || rect2.width <= 0 || rect2.height <= 0)
            return false;

        return !(rect1.x > rect2.x + rect2.width ||
            rect1.x + rect1.width < rect2.x ||
            rect1.y > rect2.y + rect2.height ||
            rect1.y + rect1.height < rect2.y);
    }

    static contains(rect: Rect, x: number, y: number): boolean {

        if (rect.width <= 0 && rect.height <= 0)
            return false;

        return (x > rect.x &&
            x < rect.x + rect.width &&
            y >= rect.y &&
            y < rect.y + rect.height);

    }

    static intersectionArea(a: Rect, b: Rect): Rect {

        var out = new Rect();

        if (Rect.intersects(a, b)) {

            out.y = Math.max(a.y, b.y);
            out.x = Math.max(a.x, b.x);
            out.width = Math.min(a.x + a.width, b.x + b.width) - out.x;
            out.height = Math.min(a.y + a.height, b.y + b.height) - out.y;

        }

        return out;

    }


}



