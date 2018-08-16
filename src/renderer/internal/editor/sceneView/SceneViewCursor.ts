import EventEmitter from "../../../engine/events/emitter/EventEmitter";
import SceneViewInputData from "./SceneViewInputData";
import MathUtils from "../../../engine/math/MathUtils";
import Rect from "../../../engine/math/Rect";
import Manager from '../../../manager';

function getMouseWheelEvent(): string {
    let prefix = "";

    if (window.addEventListener) {
        //_addEventListener = "addEventListener";
    } else {
        //_addEventListener = "attachEvent";
        prefix = "on";
    }

    const support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
        document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
            "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox

    return prefix + support;
}

export enum CursorMode {
    None,
    ViewZoom,
    ViewMove,
    Selection,
}


export default class SceneViewCursor {

    private _startPosition: IVector2;
    private _position: IVector2;
    private _selectionArea: Rect;
    private _mode: CursorMode;
    private _body: HTMLElement;


    holding: boolean = false;
    target: HTMLElement;
    emitter: EventEmitter;

    private inputData: SceneViewInputData;

    public get mode(): CursorMode {
        return this._mode;
    }

    public get startPosition(): IVector2 {
        return this._startPosition;
    }

    public get position(): IVector2 {
        return this._position;
    }


    constructor(target: HTMLElement, emitter: EventEmitter, inputData: SceneViewInputData) {
        this.target = target;
        this.emitter = emitter;
        this._startPosition = { x: 0, y: 0 };
        this._position = { x: 0, y: 0 };
        this._selectionArea = new Rect();
        this.inputData = inputData;
        this._body = Manager.body;
    }

    init() {

        const wheelEventName = getMouseWheelEvent();

        const config = {
            passive: false
        };


        this.target.addEventListener(wheelEventName, (event: WheelEvent) => {
            event.preventDefault();
            //console.log(event)
            this._position.x = this.inputData.transformX(event.clientX);
            this._position.y = this.inputData.transformY(event.clientY);
            let offset = {
                x: this.inputData.transformX(event.clientX),
                y: this.inputData.transformY(event.clientY)
            }
            const wheelDelta = MathUtils.sign(-event.deltaY);// || event.detail;
            this.emitter.emit('zoom', wheelDelta, offset);
        }, config);

        this.target.addEventListener('mousedown', (event: MouseEvent) => {
            event.preventDefault();

            if (this._mode === CursorMode.None) {
                this._startPosition.x = this.inputData.transformX(event.clientX);
                this._startPosition.y = this.inputData.transformY(event.clientY);
                if ((event.buttons & (4 || 0)) > 0) {
                    this._mode = CursorMode.ViewMove;
                    this.emitter.emit('prepareViewMove');
                    this.holding = true;
                    this.target.style.cursor = 'grab'
                    this._body.style.cursor = 'grab';
                } else if ((event.buttons & (1 || 0)) > 0) {
                    this._mode = CursorMode.Selection;
                    this.emitter.emit('select', this._startPosition);
                }

            }
        }, config);



        this.target.addEventListener('mousemove', (event: MouseEvent) => {
            event.preventDefault();
            //event.stopPropagation();
            //this._position.x = this.inputData.transformX(event.clientX);
            //this._position.y = this.inputData.transformY(event.clientY);

            //this.emitter.emit('redraw');
        })


        Manager.on('mousemove', (position:IVector2) => {
            if (this._mode !== CursorMode.None) {

                position = this.inputData.transform(position);

                if (this._mode === CursorMode.ViewMove) {

                    this.target.style.cursor = 'grabbing'
                    this._body.style.cursor = 'grabbing';

                    if (this._startPosition.x !== position.x || this._startPosition.y !== position.y) {
                        const deltaPos = {
                            x: -position.x + this._startPosition.x,
                            y: -position.y + this._startPosition.y
                        }

                        this.emitter.emit('move', deltaPos);
                    }
                } else if (this._mode === CursorMode.Selection) {
                    const w = MathUtils.floor(position.x - this.startPosition.x);
                    const h = MathUtils.floor(position.y - this.startPosition.y);
                    this._selectionArea.set(this._startPosition.x, this.startPosition.y, w, h)
                    this.emitter.emit('selection', this._selectionArea);
                }
            }
        });

        Manager.on('mouseup', () => {
            this._mode = CursorMode.None;
            this.holding = false;
            this.target.style.cursor = 'default'
            this.emitter.emit('selection');

        });

   

    }

}