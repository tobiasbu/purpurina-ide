import Vector2 from "../engine/math/Vector2";
import { Editing } from "./Editing";
import EditorManager from "./EditorManager";

type CursorEditingCallback = (delta: number) => void
type CursorEditingEndCallback = (delta: number) => void

export default class EditorInput {

    //private _cursorMode: CursorMode;
    private _manager: EditorManager;
    private _position: Vector2;
    private _startPosition: Vector2;
    private _callbackChanger: CursorEditingCallback;
    private _callbackEnd: CursorEditingEndCallback;
    private _mode: Editing;
    private _callbackTarget: any;

    public get mode(): Editing {
        return this._mode;
    }

    constructor(emitter: EditorManager) {
        this._manager = emitter;
        this._position = new Vector2();
        this._startPosition = new Vector2();
        this._mode = Editing.None;
    }


    public get position(): IVector2 {
        return this._position;
    }



    init() {

        const config = {
            passive: false
        };

        document.addEventListener('mousemove', (event: MouseEvent) => {
            event.preventDefault();
            event.stopPropagation();

            this._position.x = event.clientX;
            this._position.y = event.clientY;

            if (this._mode === Editing.None) {
                this._manager.emit('mousemove', this._position);
            } else {
                const deltaPos = {
                    x: -this._position.x + this._startPosition.x,
                    y: -this._position.y + this._startPosition.y
                }
                this._manager.body.style.cursor = 'col-resize';

                if (this._position.x < window.screen.availWidth) {
                    
                }

                this._callbackChanger.call(this._callbackTarget, deltaPos.x)
            }
        }, config);

        document.addEventListener('mouseup', (event: MouseEvent) => {
            event.preventDefault();
            event.stopPropagation();

            this._manager.body.style.cursor = 'default';

            if (this._mode === Editing.None) {
                this._manager.emit('mouseup');
            } else {
                this._mode = Editing.None;
                this._callbackEnd.call(this._callbackTarget);

            }

        }, config);
    }

    setAxisEditing(onChange: CursorEditingCallback, onEnd: CursorEditingEndCallback, context?: any) {
        this._mode = Editing.AxisLabel;
        this._startPosition.copy(this._position);
        this._callbackChanger = onChange;
        this._callbackEnd = onEnd;
        this._callbackTarget = context || this;
    }

}