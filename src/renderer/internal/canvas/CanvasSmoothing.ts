import { RenderingType } from "../renderer/RendererProperties";

type ImageSmoothingVendorPrefix = 'imageSmoothingEnabled' | 'webkitImageSmoothingEnabled' | 'mozImageSmoothingEnabled' | 'oImageSmoothingEnabled' | 'msImageSmoothingEnabled'

function getImageSmoothPrefix(context: CanvasRenderingContext2D | WebGLRenderingContext): ImageSmoothingVendorPrefix {

    const vendors = ['i', 'webkitI', 'msI', 'mozI', 'oI'];
    for (let i = 0; i < vendors.length; i++) {
        const s = vendors[i] + 'mageSmoothingEnabled';


        if (context[s] !== undefined)
            return s as ImageSmoothingVendorPrefix;
    }

    return null;
}


export default class CanvasSmoothing {

    private imageSmoothPrefix: ImageSmoothingVendorPrefix;
    private context: CanvasRenderingContext2D | WebGLRenderingContext;

    constructor(context: CanvasRenderingContext2D | WebGLRenderingContext) {
        this.context = context;
        this.imageSmoothPrefix = getImageSmoothPrefix(context);
    }

    setEnable(flag?: boolean) {

        if (flag === undefined)
            flag = true;

        if (this.imageSmoothPrefix)
            this.context[this.imageSmoothPrefix] = flag;
    }

    set(renderType: RenderingType) {
        if (renderType == RenderingType.Nearest) {
            this.setEnable(false);
        } else {
            this.setEnable(true);
        }
    }

}
