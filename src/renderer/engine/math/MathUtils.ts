
class MathUtils  {


    readonly radtodeg = Math.PI / 180;
    readonly degtorad = 180 / Math.PI;
    readonly TAU = Math.PI * 2;
    //HALFPI : Math.PI / 2,
    readonly EPSILON = Math.pow(2, -52);
    readonly HALFPI = 1.5707963267948966;

    floor(value: number): number {
        return (value >> 0);
    }

    round(value: number): number {
        // With a bitwise or.
        //let rounded = (0.5 + value) | 0;
        // FASTEST - A double bitwise not.
        return ~~(0.5 + value);

        // Finally, a left bitwise shift.
        //rounded = (0.5 + value) << 0;
    }

    abs(value: number): number {
        return ((value < 0) ? (-value) : (value));
    }

    max(a: number, b: number): number {
        return (a < b) ? b : a;
    }

    min(a: number, b: number): number {
        return !(b < a) ? a : b;
    }

    sign(value: number): number {
        return (value < 0) ? -1 : (value > 0) ? 1 : 0;
    }

    clamp(value: number, min: number, max: number): number {
        return (value > min) ? (value < max) ? value : max : min;
    }

    lerp(fromValue: number, toValue: number, t: number): number {
        return (1.0 - t) * fromValue + t * toValue;
    }

    clampedLerp(fromValue: number, toValue: number, t: number): number {
        t = this.clamp(t, 0.0, 1.0);
        return this.lerp(fromValue, toValue, t);
    }

    impreciseLerp(fromValue: number, toValue: number, t: number): number {
        return fromValue + t * (toValue - fromValue);
    }

    distance(x0: number, y0: number, x1: number, y1: number): number {
        return Math.sqrt((x0 -= x1) * x0 + (y0 -= y1) * y0);
    }

    angleBetween(x0: number, y0: number, x1: number, y1: number): number {
        let angle = this.degToRad(Math.atan2(y1 - y0, x1 - x0));

        if (angle < 0 && angle >= -180)
            angle = 360 + angle;


        return angle;
    }

    radToDeg(radians: number): number {
        return radians * this.radtodeg;
    }

    degToRad(degrees: number): number {
        return degrees * this.degtorad;
    }

    manhattan(from_x: number, from_y: number, to_x: number, to_y: number): any {
        return {
            x: this.abs(to_x - from_x),
            y: this.abs(to_y - from_y)
        };
    }

    inManhattanRadius(from_x: number, from_y: number, to_x: number, to_y: number, radius: number, radius_y: number): boolean {
        if (radius_y === undefined) radius_y = radius;
        const dist = this.manhattan(from_x, from_y, to_x, to_y);
        if (dist.x <= radius && dist.y <= radius_y)
            return true;
        else
            return false;
    }

    average(...args: number[]): number {
        const length = args.length;
        if (length === 0)
            return 0;
        return (this.sum.apply(this, args) / length);

    }

    sum(...args: number[]): number {
        const length = args.length;
        if (length === 0)
            return 0;
        let r = args[0];
        for (let i = 1; i < length; i++) {
            r += args[i];
        }
        return r;
    }

    sub(...args: number[]): number {
        const length = args.length;
        if (length === 0)
            return 0;
        let r = args[0];
        for (let i = 1; i < length; i++) {
            r -= args[i];
        }
        return r;
    }

    lerpAngle(fromValue: number, toValue: number, t: number): number {

        /*var shortest_angle = ((((toValue - fromValue) % 360) + 540) % 360) - 180;
        return shortest_angle * t;*/

        let end = toValue;
        let start = fromValue;

        const difference = Math.abs(end - start);
        if (difference > 180) {
            // We need to add on to one of the values.
            if (end > start) {
                // We'll add it on to start...
                start += 360;
            } else {
                // Add it on to end.
                end += 360;
            }
        }

        // Interpolate it.
        const value = (start + ((end - start) * t));

        if (value >= 0 && value <= 360)
            return value;

        // Wrap it..
        return (value % 360);


    }

};

Object.freeze(MathUtils);

export default new MathUtils;