import EngineSystem from "../../system/EngineSystem";
import IInputManager from "./IInputManager";
import MouseSystem from "./mouse/MouseSystem";
import IMouseSystem from "./mouse/IMouseSystem";
import SharedInputData from "./SharedInputData";
import MouseConfig from "./mouse/MouseConfig";
import IRenderer from "../renderer/IRenderer";

interface InputConfig {
    mouse: MouseConfig;
}

export default class InputManager extends EngineSystem implements IInputManager {
    private _mouse: MouseSystem;
    private _inputData: SharedInputData;

    public get mouse(): IMouseSystem {
        return this._mouse;
    }


    constructor() {
        super('InputManager');
        this._mouse = new MouseSystem();
    }

    reset() {
        throw new Error("Method not implemented.");
    }
    init(config: InputConfig, renderer: IRenderer) {

        if (this._initialized) {
            return;
        }

        this._inputData = new SharedInputData(renderer);
        this._mouse.init(config.mouse, this._inputData);
        this._initialized = true;
    }
    destroy() {
        throw new Error("Method not implemented.");
    }
    protected onEnable() {
        throw new Error("Method not implemented.");
    }
    protected onDisable() {
        throw new Error("Method not implemented.");
    }


}