import IInputSystem from "../IInputSystem";

export enum MouseButton {
    Left,
    Middle,
    Right,
    Back,
    Forward
};


export default interface IMouseSystem extends IInputSystem {

    readonly clientPosition: IVector2;
    readonly x: number;
    readonly y: number;
    readonly moved: boolean;
    readonly isDown: boolean;
    readonly normalizedPosition: IVector2;

    press(code: MouseButton): boolean;
    release(code: MouseButton): boolean;
    down(code: MouseButton): boolean;

}

