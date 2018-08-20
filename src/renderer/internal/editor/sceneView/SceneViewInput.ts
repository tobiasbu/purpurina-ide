import EventEmitter from "../../../engine/events/emitter/EventEmitter";
import CursorTransform from "./CursorTransform";
import SceneViewCursor from "./SceneViewCursor";



export default class SceneViewInput {

    private inputData: CursorTransform;
    private _cursor: SceneViewCursor;
    public get cursor(): SceneViewCursor {
        return this._cursor;
    }

    constructor(target: HTMLCanvasElement, emitter: EventEmitter) {
        
        this.inputData = new CursorTransform(target);
        this._cursor = new SceneViewCursor(target, emitter, this.inputData);
    }

    resize() {
        this.inputData.updateClientRect();
    }

    init() {

        this._cursor.init();

       
    }

}