import EngineSystem from "../../system/EngineSystem";
import List from "../../engine/structures/List";
import CustomMap from "../../engine/structures/CustomMap";
import KeyButtonControl from "./keyButton/KeyButtonControl";
import IInputSystem from "./IInputSystem";

export type InputEventHandler = (event: MouseEvent | KeyboardEvent) => void;
export type MouseEventHandler = (event: MouseEvent) => void;

export default abstract class InputSystem extends EngineSystem implements IInputSystem {

    eventQueue: List<MouseEvent|KeyboardEvent>;
    protected eventHandler: InputEventHandler;
    protected eventTarget: HTMLElement;
    protected watcher: CustomMap<number, KeyButtonControl>;
    protected garbage: string[];
    protected _preventDefault: boolean;



    constructor(systemName: string) {
        super(systemName);

        this.eventQueue = new List<MouseEvent|KeyboardEvent>();
        this.watcher = new CustomMap<number, KeyButtonControl>();
        this.garbage = [];

        this.eventTarget = null;
        this.eventHandler = null;

        this._preventDefault = true;
    }

    get preventDefault(): boolean {
        return this._preventDefault;
    }
    set preventDefault(value: boolean) {
        this._preventDefault = value;
    }

    clear() {
        this.watcher.clear();
        this.garbage.splice(0, this.garbage.length);
        this.eventQueue.clear();
    }

    abstract stop();
    abstract press(code: number): boolean;
    abstract release(code: number): boolean;
    abstract down(code: number): boolean;
}
