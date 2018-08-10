
import Color from "../Color";
import { IColor } from "../IColor";

export default function ObjectToColor(value: IColor, source?:Color): IColor {

    if (source === undefined) {
        return new Color(value.r, value.g, value.b, value.a);
    } else {
        return source.setRGBA(value.r, value.g, value.b, value.a);
    }

    

}