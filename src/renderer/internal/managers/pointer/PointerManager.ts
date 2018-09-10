import Vector2 from "../../../engine/math/Vector2";
import { IEventEmitter } from "../../../engine/events/emitter/IEventEmitter";
import View from "../../sceneView/View";

export enum PointerMode {
    None,
    ViewZoom,
    ViewStartMove,
    ViewMoving,
    ViewSelection,
    ViewSelectionArea,
    VectorAxisEditing
}

type CursorEditingCallback = (delta: number) => void
type CursorEditingEndCallback = (delta: number) => void

/**
 * Controls the cursor editor DOM events and state
 */
export default class PointerManager {
    private _position: Vector2;
    private _startPosition: Vector2;


    private _delta: Vector2;
    private _timestamp: number;


    private _callbackChanger: CursorEditingCallback;
    private _callbackEnd: CursorEditingEndCallback;
    private _callbackTarget: any;

    private _viewTarget: View;

    private _mode: PointerMode;
    private _body: HTMLElement;
    private _emitter: IEventEmitter;


    public get mode(): PointerMode {
        return this._mode;
    }

    public get position(): IVector2 {
        return this._position;
    }

    public get startPosition(): IVector2 {
        return this._startPosition;
    }

    public get timestamp(): number {
        return this._timestamp;
    }

    constructor(emitter: IEventEmitter) {
        this._body = document.getElementsByTagName("BODY")[0] as HTMLElement;
        this._position = new Vector2();
        this._startPosition = new Vector2();
        this._delta = new Vector2();
        this._emitter = emitter;
        this.setPointerMode(PointerMode.None);

    }



    private processMouseMove = (event: MouseEvent) => {


        if (event.srcElement.tagName !== 'INPUT') {
            event.preventDefault();
            event.stopPropagation();
        }



        if (this._mode == PointerMode.ViewStartMove) {
            this.setPointerMode(PointerMode.ViewMoving);
        } else if (this._mode == PointerMode.ViewSelection) {
            this.setPointerMode(PointerMode.ViewSelectionArea);
        }


        this._position.x = event.clientX;
        this._position.y = event.clientY;

        this._delta.x = this._position.x - this._startPosition.x;
        this._delta.y = this._position.y - this._startPosition.y;

        switch (this._mode) {

            case PointerMode.ViewMoving:
            case PointerMode.ViewSelectionArea: {
                this._emitter.emit('sceneView_mousemove', this._position, this._delta);
                break;
            }
            case PointerMode.VectorAxisEditing: {
                const deltaPos = {
                    x: -this._position.x + this._startPosition.x,
                    y: -this._position.y + this._startPosition.y
                }
                this._callbackChanger.call(this._callbackTarget, deltaPos.x)
                break;
            }
        }

        // if (this._mode === PointerMode.ViewMoving) {
        //     this._emitter.emit('sceneView_mousemove', this._position);
        // } else {

        //     //this._manager.body.style.cursor = 'col-resize';

        //     if (this._position.x < window.screen.availWidth) {

        //     }


        // }
    }

    private processMouseUp = (event: MouseEvent) => {
        if (event.srcElement.tagName !== 'INPUT') {
            event.preventDefault();
            event.stopPropagation();
        }

        if (this._mode == PointerMode.None) {
            return;
        }

        this._position.x = event.clientX;
        this._position.y = event.clientY;

        if (this._mode === PointerMode.VectorAxisEditing) {
            this._callbackEnd(this._delta.x);
        }


        this.setPointerMode(PointerMode.None);



    }

    startListeners() {

        const config = {
            passive: false
        };

        document.addEventListener('mousemove', this.processMouseMove, config);
        document.addEventListener('mouseup', this.processMouseUp, config);
    }

    public setPointerMode(mode: PointerMode) {
        if (this._mode !== mode) {

            if (mode != PointerMode.None && mode != PointerMode.ViewZoom) {
                this._body.classList.add('pointerEditing');
            } else {
                this._body.classList.remove('pointerEditing');
            }

            let cursorStyle: string;

            switch (mode) {
                default:
                case PointerMode.ViewZoom:
                case PointerMode.None: {
                    cursorStyle = 'default';
                    break;
                }

                case PointerMode.ViewSelection: {
                    this._startPosition.copy(this._position);
                    this._timestamp = Date.now();
                    break;
                }

                case PointerMode.ViewStartMove: {
                    this._startPosition.copy(this._position);
                    cursorStyle = 'grab';
                    break;
                }
                case PointerMode.ViewMoving: {
                    cursorStyle = 'grabbing';
                    break;
                }
                case PointerMode.VectorAxisEditing: {
                    this._startPosition.copy(this._position);
                    cursorStyle = 'col-resize';
                    break;
                }
            }

            if (cursorStyle !== undefined) {
                this._body.style.cursor = cursorStyle;
            }
            this._mode = mode;
        }
    }

    setAxisEditing(onChange: CursorEditingCallback, onEnd: CursorEditingEndCallback, context?: any) {
        this.setPointerMode(PointerMode.VectorAxisEditing);

        this._callbackChanger = onChange;
        this._callbackEnd = onEnd;
        this._callbackTarget = context || this;
    }
}