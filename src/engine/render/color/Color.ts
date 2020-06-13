import MathUtils from '../../math/MathUtils';
import parseColor from './components/ParseColor';
import Ease from '../../math/easing/Ease';
import { EasingType } from '../../math/easing/EasingType';
import { IColor } from './IColor';

// function ColorNormUpdate(color) {
//     color._css = 'rgba(' +
//         MathUtils.floor(color.r * 255) + ',' +
//         MathUtils.floor(color.g * 255) + ',' +
//         MathUtils.floor(color.b * 255) + ',' +
//         color.a + ')';
// }

function colorUpdate(color: Color): string {
  return (
    'rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + color.a + ')'
  );
}

export default class Color implements IColor {
  private _r: number;
  private _g: number;
  private _b: number;
  private _a: number;
  private _css: string;

  constructor(r?: number, g?: number, b?: number, a?: number) {
    if (r === undefined) r = 0;
    if (g === undefined) g = 0;
    if (b === undefined) b = 0;
    if (a === undefined) a = 1;

    this._r = r;
    this._g = g;
    this._b = b;
    this._a = a;

    this._css = colorUpdate(this);
  }

  get rgba() {
    return this._css;
  }
  get r() {
    return this._r;
  }
  get g() {
    return this._g;
  }
  get b() {
    return this._b;
  }
  get a() {
    return this._a;
  }
  set a(value) {
    this._a = value;
    this._css = colorUpdate(this);
  }

  set(color: string | number | IColor): Color {
    parseColor(color, this);

    colorUpdate(this);

    return this;
  }

  setNorm(r: number, g?: number, b?: number, a?: number): Color {
    if (r === undefined) return this;

    this._r = Math.round(r * 255.0);
    this._g = Math.round(g * 255.0);
    this._b = Math.round(b * 255.0);

    if (a !== undefined) {
      this._a = Math.round(a * 255.0);
    }

    this._css = colorUpdate(this);

    return this;
  }

  setRGB(r: number, g: number, b: number): Color {
    return this.setRGBA(r, g, b, 255);
  }

  setRGBA(r: number, g?: number, b?: number, a?: number): Color {
    if (r === undefined) return this;

    this._r = r || 0;
    this._g = g || 0;
    this._b = b || 0;

    if (a !== undefined) {
      this._a = a;
    }

    this._css = colorUpdate(this);

    return this;
  }

  setColor(color: IColor, a?: number): Color {
    this._r = color.r;
    this._g = color.g;
    this._b = color.b;
    if (a !== undefined) {
      this._a = a;
    } else {
      this._a = color.a;
    }

    this._css = colorUpdate(this);
    return this;
  }

  parse(value: number | string | IColor) {
    let parsedValue = parseColor(value);
    this._r = parsedValue.r;
    this._g = parsedValue.g;
    this._b = parsedValue.b;
    this._a = parsedValue.a;
    colorUpdate(this);
    return this;
  }

  lerp(toColor: IColor, t: number): Color {
    this._r = MathUtils.lerp(this._r, toColor.r, t);
    this._g = MathUtils.lerp(this._g, toColor.g, t);
    this._b = MathUtils.lerp(this._b, toColor.b, t);
    this._a = MathUtils.lerp(this._a, toColor.a, t);
    colorUpdate(this);
    return this;
  }

  /*ease(to, t, easingType, easingMode, easingArg) {
       if (easingType === undefined) easingType = EasingType.LINEAR;
       if (easingMode === undefined) easingMode = 0;
       if (easingArg === undefined) easingArg = 1;

      let easer = Ease.in;

       switch (easingMode) {
           case 1: {
              easer = Ease.out;
              break;
           }
           case 2: {
              easer = Ease.inout;
              break;
           }
       }

       this._r = easer.by(easingType, this._r, to.r, t, easingArg);
       this._g = easer.by(easingType, this._g, to.g, t, easingArg);
       this._b = easer.by(easingType, this._b, to.b, t, easingArg);
       this._a = easer.by(easingType, this._a, to.a, t, easingArg);

       ColorUpdate(this);
       return this;
  }*/

  to32() {
    /// TODO
  }

  toCSS() {
    /// TODO
  }

  toInt() {
    /// TODO
  }

  toHex() {
    /// TODO
  }

  // static functions

  static ease(
    from: IColor,
    to: IColor,
    t: number,
    easingType,
    easingMode,
    easingArg,
    destinationColor
  ) {
    if (easingType === undefined) easingType = EasingType.LINEAR;
    if (easingMode === undefined) easingMode = 0;
    if (easingArg === undefined) easingArg = 3;

    let easer = Ease.in;

    switch (easingMode) {
      case 1: {
        easer = Ease.out;
        break;
      }
      case 2: {
        easer = Ease.inout;
        break;
      }
    }

    if (destinationColor === undefined) destinationColor = new Color();

    destinationColor.setRGBA(
      easer.by(easingType, from.r, to.r, t, easingArg),
      easer.by(easingType, from.g, to.g, t, easingArg),
      easer.by(easingType, from.b, to.b, t, easingArg),
      easer.by(easingType, from.a, to.a, t, easingArg)
    );

    return destinationColor;
  }

  static get red(): Color {
    return new Color(255, 0, 0);
  }
  static get green(): Color {
    return new Color(0, 255, 0);
  }
  static get blue(): Color {
    return new Color(0, 0, 255);
  }
  static get cyan(): Color {
    return new Color(0, 255, 255);
  }
  static get magenta(): Color {
    return new Color(255, 0, 255);
  }
  static get yellow(): Color {
    return new Color(255, 255, 0);
  }
  static get black(): Color {
    return new Color(0);
  }
  static get white(): Color {
    return new Color(255);
  }
  static get gray(): Color {
    return new Color(255 / 2.0);
  }
  static get transparent(): Color {
    return new Color(0, 0, 0, 0);
  }
}
