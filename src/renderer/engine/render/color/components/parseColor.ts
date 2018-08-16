import IntToColor from "./IntToColor";
import CSSToColor from "./CSSToColor";
import HexToColor from "./HexToColor";
import ObjectToColor from "./ObjectToColor";
import { IColor } from "../IColor";
import Color from '../Color';

function isNumber(x: any): x is number {
  return typeof x === "number";
}

function isString(x: any): x is string {
  return typeof x === "string";
}

function isObject(x: any): x is Object {
  return typeof x === "object";
}

export default function parseColor(value: number | string | IColor, source?: Color) {


  if (isNumber(value)) {

    return IntToColor(value, source);

  } else if (isString(value)) {

    if ((value as string).substr(0, 3).toLowerCase() === 'rgb') {
      return CSSToColor(value, source);
    } else {
      return HexToColor(value, source);
    }

  } else if (isObject(value)) {

    return ObjectToColor(value, source);
  }

  throw new Error('Could not convert color.')

}