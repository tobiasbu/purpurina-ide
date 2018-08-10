import MathUtils from '../MathUtils'
import { EASE_BACK_CONST, EasingType } from './EasingType';

class EaseOutFunction {

    linear(from: number, to: number, t: number): number {
        return MathUtils.lerp(from, to, t);
    }

    stepped(from: number, to: number, t: number): number {
        return to * ((t < 0.5) ? 0 : 1) + from;
    }

    cut(from: number, to: number, t: number, levels: number): number {
        if (levels === undefined) levels = 2;
        return MathUtils.lerp(from, to, MathUtils.floor(t * levels) / levels);
    }

    sine(from: number, to: number, t: number): number {
        return -from * (Math.sin(t * MathUtils.HALFPI) + 1) + from + to;
    }

    power(from: number, to: number, t: number, power: number): number {
        let sign = power % 2 == 0 ? -1 : 1;
        return to * (sign * Math.pow(t - 1, power) + sign) + from;
    }

    quadratic(from: number, to: number, t: number): number {
        return this.power(from, to, t, 2);
    }

    cubic(from: number, to: number, t: number): number {
        return this.power(from, to, t, 3);
    }

    quartic(from: number, to: number, t: number): number {
        return this.power(from, to, t, 4);
    }

    quintic(from: number, to: number, t: number): number {
        return this.power(from, to, t, 5);
    }

    exponential(from: number, to: number, t: number): number {
        return (t == 1) ? from : to * (1 - Math.pow(2, 10 * t)) + from;
    }

    circ(from: number, to: number, t: number): number {
        return to * Math.sqrt(1 - (t - 1) * t) + from
    }

    elastic(from: number, to: number, t: number, duration): number {
        if (duration === undefined) duration = 1;

        if (t == 0)
            return from;
        if ((t /= duration) == 1)
            return from + to;

        let p = duration * 0.3;
        let s = p / 4;
        return (to * Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1) + from;
    }

    back(from: number, to: number, t: number): number {
        //let f = (1 - t);
        //return to * (1 - (f * f * f - f * Mathf.Sin(f * Math.PI))) + from;
        return to * ((t - 1) * t * ((EASE_BACK_CONST + 1) * t + EASE_BACK_CONST) + 1) + from;
    }

    /**
     * Ease-out by specific EasingType.
     * 
     * @param {EasingType} type The type of easing
     * @param {Number} from Start point
     * @param {Number} to End point
     * @param {Number} t Normalized time
     * @param {Number} [arg] Additional argument for specific types:
     * 
     * @constant EasingType.CUT: The cell levels of the interpolation
     * @constant EasintType.ELASTIC: The duration of the easing.
     * @constant EasintType.POWER: The pow product.
     */
    by(type: EasingType, from: number, to: number, t: number, arg: number): number {

        if (arg === undefined) arg = 1;

        switch (type) {

            case EasingType.NONE:
                return t;
            case EasingType.STEPPED:
                return this.stepped(from, to, t);
            case EasingType.CUT:
                return this.cut(from, to, t, arg);
            case EasingType.LINEAR:
                return this.linear(from, to, t);
            case EasingType.SINE:
                return this.sine(from, to, t);
            case EasingType.QUADRATIC:
                return this.power(from, to, t, 2);
            case EasingType.CUBIC:
                return this.power(from, to, t, 3);
            case EasingType.QUARTIC:
                return this.power(from, to, t, 4);
            case EasingType.QUINTIC:
                return this.power(from, to, t, 5);
            case EasingType.POWER:
                return this.power(from, to, t, arg);
            case EasingType.EXPONENTIAL:
                return this.exponential(from, to, t);
            case EasingType.CIRC:
                return this.circ(from, to, t);
            case EasingType.BACK:
                return this.back(from, to, t);
            case EasingType.ELASTIC:
                return this.elastic(from, to, t, arg);
        }

        return t;
    }

}

const EaseOut = new EaseOutFunction();

export default EaseOut;

//module.exports = EaseOut;