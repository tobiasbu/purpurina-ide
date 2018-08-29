import EventEmitter from "../../engine/events/emitter/EventEmitter";
import CursorTransform from "../managers/pointer/PointerTransform";
import MathUtils from "../../engine/math/MathUtils";
import Rect from "../../engine/math/Rect";
import { Events, Pointer } from "../managers";
import { PointerMode } from "../managers/pointer/PointerManager";
import { getMouseWheelEventName } from "../../dom/utils";




export default class ViewPointer {

    private _startPosition: IVector2;
    private _position: IVector2;
    private _selectionArea: Rect;


    holding: boolean = false;
    target: HTMLElement;
    emitter: EventEmitter;

    private _cursorTransform: CursorTransform;

    public get startPosition(): IVector2 {
        return this._startPosition;
    }

    public get position(): IVector2 {
        return this._position;
    }


    constructor(target: HTMLElement, emitter: EventEmitter, inputData: CursorTransform) {
        this.target = target;
        this.emitter = emitter;
        this._startPosition = { x: 0, y: 0 };
        this._position = { x: 0, y: 0 };
        this._selectionArea = new Rect();
        this._cursorTransform = inputData;
    }

    startListeners() {

        const wheelEventName = getMouseWheelEventName();

        const config: AddEventListenerOptions = {
            passive: false,
            capture: false
        };


        this.target.addEventListener(wheelEventName, (event: WheelEvent) => {
            event.preventDefault();
            event.stopPropagation();

            if (Pointer.mode != PointerMode.None && Pointer.mode != PointerMode.ViewZoom) {
                return;
            }

            //if (Pointer.mode != PointerMode.ViewZoom) {
            Pointer.setPointerMode(PointerMode.ViewZoom);
            // }

            if (Pointer.mode == PointerMode.ViewZoom) {

                //console.log(event)
                this._position.x = this._cursorTransform.transformX(event.clientX);
                this._position.y = this._cursorTransform.transformY(event.clientY);
                // let offset = {
                //     x: this._cursorTransform.transformX(event.clientX),
                //     y: this._cursorTransform.transformY(event.clientY)
                // }
                const wheelDelta = MathUtils.sign(-event.deltaY);// || event.detail;
                this.emitter.emit('zoom', wheelDelta, this._position);
                Pointer.setPointerMode(PointerMode.None);
            }
        }, config);

        this.target.addEventListener('mousedown', (event: MouseEvent) => {
            event.preventDefault();
            event.stopPropagation();

            if (Pointer.mode != PointerMode.None) {
                return;
            } else {

                if ((event.buttons & (4 || 0)) > 0) {  // middle button
                    Pointer.setPointerMode(PointerMode.ViewStartMove);
                    //this._view.prepareMove();
                    this.emitter.emit('prepareViewMove');
                } else if ((event.buttons & (1 || 0)) > 0) {
                    Pointer.setPointerMode(PointerMode.ViewSelection);
                    this.emitter.emit('select', this._cursorTransform.transform(Pointer.position));
                }
            }




            //if (Pointer.mode == PointerMode.ViewStartMove) {

            // if (this._mode === CursorMode.None) {
            //     this._startPosition.x = this._cursorTransform.transformX(event.clientX);
            //     this._startPosition.y = this._cursorTransform.transformY(event.clientY);
            //     if ((event.buttons & (4 || 0)) > 0) {
            //         this._mode = CursorMode.ViewMove;
            //         this.emitter.emit('prepareViewMove');
            //         this.holding = true;
            //         this.target.style.cursor = 'grab'
            //         //this._body.style.cursor = 'grab';
            //     } else if ((event.buttons & (1 || 0)) > 0) {
            //         this._mode = CursorMode.Selection;
            //         this.emitter.emit('select', this._startPosition);
            //     }

            // }
        }, config);



        // this.target.addEventListener('mousemove', (event: MouseEvent) => {
        //     event.preventDefault();
        //     //event.stopPropagation();
        //     //this._position.x = this._cursorTransform.transformX(event.clientX);
        //     //this._position.y = this._cursorTransform.transformY(event.clientY);

        //     //this.emitter.emit('redraw');
        // })


        Events.on('sceneView_mousemove', (position: IVector2, delta: IVector2) => {

            // console.log("asdad")
            if (Pointer.mode == PointerMode.ViewStartMove) {
                Pointer.setPointerMode(PointerMode.ViewMoving);
            }

            //     const timestamp = Date.now() - Pointer.timestamp;
            //     console.log(timestamp)


            //     if (timestamp > 0) {
            //         Pointer.setPointerMode(PointerMode.ViewSelectionArea);
            //     }
            // }


            if (Pointer.mode != PointerMode.ViewMoving && Pointer.mode != PointerMode.ViewSelectionArea) {
                return;
            }

            //position = this._cursorTransform.transform(position);

            switch (Pointer.mode) {
                case PointerMode.ViewMoving: {
                    this.emitter.emit('move', delta);
                    break;
                }
                case PointerMode.ViewSelectionArea: {
                    const w = MathUtils.floor(delta.x);
                    const h = MathUtils.floor(delta.y);
                    const p = this._cursorTransform.transform(Pointer.startPosition);
                    this._selectionArea.set(p.x, p.y, w, h)
                    
                        this.emitter.emit('selection', this._selectionArea);
                    
                    break;
                }
            }

            // if (this._mode !== CursorMode.None) {

            //     position = this._cursorTransform.transform(position);

            //     if (this._mode === CursorMode.ViewMove) {

            //         this.target.style.cursor = 'grabbing'
            //         //this._body.style.cursor = 'grabbing';

            //         if (this._startPosition.x !== position.x || this._startPosition.y !== position.y) {
            //             const deltaPos = {
            //                 x: position.x - this._startPosition.x,
            //                 y: position.y - this._startPosition.y
            //             }

            //             this.emitter.emit('move', deltaPos);
            //         }
            //     } else if (this._mode === CursorMode.Selection) {
            //         const w = MathUtils.floor(position.x - this.startPosition.x);
            //         const h = MathUtils.floor(position.y - this.startPosition.y);
            //         this._selectionArea.set(this._startPosition.x, this.startPosition.y, w, h)
            //         this.emitter.emit('selection', this._selectionArea);
            //     }
            // }
        });

        // Events.on('mouseup', () => {

        //     this.holding = false;
        //     this.target.style.cursor = 'default'
        //     if (this._mode === CursorMode.Selection) {
        //         this.emitter.emit('selection');
        //     }
        //     this._mode = CursorMode.None;

        // });



    }

}