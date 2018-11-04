import ITransform2D from "../math/transform/ITransform2D";
import Bounds2D from "../math/bounds/Bounds2D";
import IRenderer from "../renderer/IRenderer";
import Color from "../render/color/Color";
// import { IColor } from "../render/color/IColor";
import Rect from "../math/Rect";

export default interface ICamera {

    /**
     * Reference to Renderer
     */
    readonly renderer: IRenderer;

    readonly transform: ITransform2D;

    readonly aspectRatio: number;

    readonly viewBounds: Bounds2D;

    viewPort: Rect;

    roundPixels: boolean;

    backgroundColor: Color;

    resolution: number;

    /**
     * Resets the Camera transform
     */
    reset();

    /**
     * Set background color of the camera.
     * @param color Color to set
     */
    setBackgroundColor(color: IColor | string | number);
  
}