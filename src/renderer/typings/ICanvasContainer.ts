export interface ICanvasContainer {
    canvas: HTMLCanvasElement;
    readonly id: string;
    readonly initialWidth: number;
    readonly initialHeight: number;
    using: boolean;
}