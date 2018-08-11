
export type ContextID = '2d' | 'webgl';

/**
 * Defines the type of canvas ImageRendering
 */
export enum RenderingType {
    Nearest,
    Linear
}


export enum InterpolationType {
    /**
     * Default value that uses the browser’s standard algorithm (bicubic) to maximize the appearance of an image.
     */
    Auto,
    /**
     * the contrast, colors and edges of the image will be preserved without any smoothing or blurring. 
     * According to the spec this was specifically intended for pixel art. This value applies to images scaled up or down.
     */
    CrispEdges,
    /**
     * As the image changes size the browser will preserve its pixelated style by using nearest-neighbour scaling.
     * This value only applies to images that are scaled up.
     */
    Pixelated
}
