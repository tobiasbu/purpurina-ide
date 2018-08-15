import EventEmitter from "../../../engine/events/emitter/EventEmitter";
import MathUtils from "../../../engine/math/MathUtils";
import SceneViewInputData from "./SceneViewInputData";
import SceneViewCursor from "./SceneViewCursor";



export default class SceneViewInput {

    private target: HTMLElement;
    private emitter: EventEmitter;
    private inputData: SceneViewInputData;
    private _cursor: SceneViewCursor;
    public get cursor(): SceneViewCursor {
        return this._cursor;
    }

    constructor(target: HTMLCanvasElement, emitter: EventEmitter) {
        
        this.inputData = new SceneViewInputData(target);
        this._cursor = new SceneViewCursor(target, emitter, this.inputData);
    }

    resize() {
        this.inputData.updateClientRect();
    }

    init() {

        this._cursor.init();

       
    }

}