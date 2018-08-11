import EngineSystem from "../../system/EngineSystem";
import List from "../../engine/structures/List";
import CustomMap from "../../engine/structures/CustomMap";

export type InputEventHandler = (event: MouseEvent|KeyboardEvent) => void;

export default abstract class InputSystem extends EngineSystem {

    protected eventQueue: List<Event>;
    protected eventHandler: InputEventHandler;
    protected eventTarget: HTMLElement;
    protected watcher: CustomMap<string,Button>;
    protected garbage: Button[];

    constructor(systemName: string) {
        super(systemName);
    }

    protected clear() {
        this.watcher.clear();
        this.garbage.splice(0, this.garbage.length);
        this.eventQueue.clear();
    }
}
