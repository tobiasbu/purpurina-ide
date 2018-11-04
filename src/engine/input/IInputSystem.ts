import EngineSystem from "../core/EngineSystem";

export default interface IInputSystem extends EngineSystem {

    preventDefault: boolean;

    //clear();
    stop();
    press(code: number): boolean;
    release(code: number): boolean;
    down(code: number): boolean;
}
