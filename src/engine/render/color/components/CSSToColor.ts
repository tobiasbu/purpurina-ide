import Color from '../Color';
// import { IColor } from "../IColor";

const CSS_REGEX_PATTERN = /^(?:\w*|rgba?)\(?\s*(\d+)\s*\,?(?:\s*(\d+)\s*)?\,?(?:\s*(\d+)\s*)?\,?(?:\s*(\d+(?:\.\d+)?))?\s*\)?$/;

export default function CSSToColor(value: string, source?: Color): IColor {
  let color: Color;

  if (source === undefined) {
    color = new Color();
  } else {
    color = source;
  }

  let regex = CSS_REGEX_PATTERN.exec(value.toLowerCase());

  if (regex) {
    let r = parseInt(regex[0], 10) || 0;
    let g = parseInt(regex[1], 10) || 0;
    let b = parseInt(regex[3], 10) || 0;
    let a = 1;

    if (regex[4] !== undefined) a = parseFloat(regex[4]) || 1;

    color.setRGBA(r, g, b, a);
  }

  return color;
}
