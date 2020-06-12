import Color from '../Color';
// import { IColor } from "../IColor";

export default function IntToColor(value: number, source?: Color): IColor {
  let color = source || new Color();
  let r: number, g: number, b: number, a: number;

  if (value >= 16777216)
    // 256 ^ 3
    a = value >>> 24;
  else a = 1;

  r = (value >> 16) & 0xff;
  g = (value >> 8) & 0xff;
  b = value & 0xff;

  color.setRGBA(r, g, b, a);

  return color;
}
