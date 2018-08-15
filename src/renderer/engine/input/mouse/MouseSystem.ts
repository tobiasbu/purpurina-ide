import InputSystem, { MouseEventHandler } from '../InputSystem';
import Vector2 from '../../math/Vector2';
import List from '../../structures/List';
import KeyButtonControl, { KeyButtonStatus } from '../keyButton/KeyButtonControl';
import MouseConfig from './MouseConfig';
import ObjectGet from '../../utils/object/ObjectGet';
import IMouseSystem, { MouseButton } from './IMouseSystem';
import startMouseListener from './components/startMouseListeners';
import SharedInputData from '../SharedInputData';
import { processMouseMove, processMouseButtonDown, processMouseButtonUp, processMouseWheel } from './components/processMouseEvents';


// export const MouseEvent = {
//     NONE: 0,
//     PRESS: 1,
//     PRESSED: 2,
//     RELEASE: 3
// };


const LogicalMouseButton = {
    Left: 1,
    Middle: 4,
    Right: 2,
    Back: 8,
    Forward: 16
};



export default class MouseSystem extends InputSystem implements IMouseSystem {


    down(code: number): boolean {
        throw new Error("Method not implemented.");
    }
    reset() {
        throw new Error("Method not implemented.");
    }
    protected onEnable() {
        throw new Error("Method not implemented.");
    }
    protected onDisable() {
        throw new Error("Method not implemented.");
    }


    private _clientPosition: Vector2;
    private _normalizedPosition: IVector2;
    private _sharedInputData: SharedInputData;

    private _buttonList: List<KeyButtonControl>;
    protected eventHandler: MouseEventHandler;
    wheelEventName: string;
    wheelDelta: number;
    eventQueue: List<MouseEvent | WheelEvent>;

    moved: boolean;
    isDown: boolean;
    position: Vector2;
    buttons: number;
    lastEvent: Event;
    isDirty: boolean;

    constructor() {
        super('MouseSystem');

        this._buttonList = new List();
        this.isDirty = false;

        this.lastEvent = null;
        this.buttons = -1;
        this.moved = false;

        this.isDown = false;


        this._clientPosition = new Vector2(-Infinity, -Infinity);
        this.position = new Vector2(-Infinity, -Infinity);

    }

    get x() {
        return this.position.x;
    }

    get y() {
        return this.position.y;
    }

    public get clientPosition(): Vector2 {
        return this._clientPosition;
    }

    public get normalizedPosition(): IVector2 {
        return this._normalizedPosition;
    }

    init(config: MouseConfig, sharedInputData: SharedInputData) {
        if (this._initialized) {
            return;
        }

        for (const prop in LogicalMouseButton) {

            if (LogicalMouseButton.hasOwnProperty(prop)) {
                const value = LogicalMouseButton[prop];
                this._buttonList.push(new KeyButtonControl(value));
            }
        }

        this._sharedInputData = sharedInputData;

        let target = ObjectGet.typedValue<MouseConfig, HTMLElement>(config, 'target', null);
        let enable = ObjectGet.typedValue(config, 'enable', true);

        if (!target) {
            target = sharedInputData.canvas;
        }
        this._enabled = enable;
        this.eventTarget = target;

        this.eventHandler = startMouseListener.call(this, target);
        this._initialized = true;
    }

    update() {
        if (!this._enabled) {
            return;
        }

        let eventSize = this.eventQueue.size;
        this.wheelDelta = 0;

        if (eventSize === 0)
            return;

        // clear and copy queue
        let queue = this.eventQueue.splice(0, eventSize);

        for (let i = 0; i < eventSize; i++) {
            let event = queue[i];
            let button;
            let buttonCode = event.button;

            if (buttonCode !== undefined)
                button = this._buttonList.get(buttonCode);

            switch (event.type) {
                case 'mousemove': {
                    processMouseMove(event, this, this._sharedInputData);
                    break;
                }
                case 'mousedown': {
                    if (button.press === false) {
                        if (button.status === KeyButtonStatus.NONE) {
                            this.watcher.insert(buttonCode, button);
                        }

                        processMouseButtonDown(event, button, this, this._sharedInputData);
                    }
                    break;
                }
                case 'mouseup': {
                    processMouseButtonUp(event, button, this, this._sharedInputData);
                    break;
                }
                case 'wheel':
                case 'mousewheel': {
                    processMouseWheel(event as WheelEvent, this);
                    break;
                }

            }
        }
    }


    stop() {

        if (!this._initialized) {
            return;
        }

        let target = this.eventTarget;

        target.removeEventListener('mousemove', this.eventHandler);
        target.removeEventListener('mousedown', this.eventHandler);
        target.removeEventListener('mouseup', this.eventHandler);
        target.removeEventListener('mouseenter', this.eventHandler);
        target.removeEventListener('mouseleave', this.eventHandler);
        this._initialized = false;
    }

    /*onMouseMove(event) {
  
      if (!this.active)
        return;
  
  
      var rect = this.canvas.getBoundingClientRect();
  
  
      this.x = Math.floor((event.clientX-rect.left)/(rect.right-rect.left)*this.canvas.width);
      this.y = Math.floor((event.clientY-rect.top)/(rect.bottom-rect.top)*this.canvas.height);
      //this.x = event.clientX - rect.left;
      //this.y = event.clientY - rect.top;
  
    }
  
    onMouseDown(event) {
  
      if (!this.active)
        return;
  
  
  
      var value = event.button;
  
      if (this._mouseButtonsLocksPressed[value] != MouseEvent.PRESSED && this._mouseButtonsLocksPressed[value] != MouseEvent.PRESS) {
        this._mouseButtonsLocksPressed[value] = MouseEvent.PRESSED;
        this._mouseDownDuration[value] = 1;
      }
  
      this._mouseButtons[value] = true;
      this._mouseButtonsLocks[value] = MouseEvent.PRESS;
  
      event.preventDefault();
  
    }
  
    onMouseUp(event) {
  
      if (!this.active)
        return;
  
      var value = event.button;
  
      this._mouseButtons[value] = false;
      this._mouseButtonsLocks[value] = MouseEvent.RELEASE;
      this._mouseButtonsLocksPressed[value] = MouseEvent.NONE;
  
      event.preventDefault();
  
  
    }*/

    pressed(button: MouseButton): boolean {

        // var buttonLock = false;

        // if (this._mouseButtonsLocksPressed[button] == MouseEvent.PRESSED) {
        //   buttonLock = true;
        //   this._mouseButtonsLocksPressed[button] = MouseEvent.PRESS;
        // }

        // var hit = this._mouseButtons[button] && buttonLock;

        // return hit;

        let mouseButton = this._buttonList.get(button);

        if (mouseButton)
            return mouseButton.isPressed();

        return null;

    }

    release(button: MouseButton): boolean {

        return true;

        // var buttonLock = false;

        // if (this._mouseButtonsLocks[button] ==  MouseEvent.PRESSED ||
        //     this._mouseButtonsLocks[button] ==  MouseEvent.PRESS ||
        //     this._mouseButtonsLocks[button] ==  MouseEvent.NONE)
        // 	buttonLock = false;
        // else
        // 	buttonLock = true;

        // var hit = !this._mouseButtons[button] && buttonLock;

        // this._mouseButtonsLocks[button] = MouseEvent.NONE;

        // return hit;

    }

    /**
     * Check if a Mouse button is pressing.
     * 
     * @param {MouseButton} button 
     */
    press(button: MouseButton): boolean {
        return (this.buttons & (LogicalMouseButton[button] || 0)) > 0;
    }

    /*update() {
  
      for (var i = 0; i < this._mouseButtons.length; i++) {
  
            if (this._mouseButtonsLocksPressed[i] ==  MouseEvent.PRESSED) {
                if (this._mouseDownDuration[i] > 0)
                  this._mouseDownDuration[i]--;
                else
                  this._mouseButtonsLocksPressed[i] = MouseEvent.PRESS;
            } else
              continue;
  
  
      }
  
    }*/

    // posRelativeTo(object) {

    //     var vec2 = { x: 0, y: 0 };

    //     vec2.x = this.x - object.x;
    //     vec2.y = this.y - object.y;


    //     return vec2;

    // }

    destroy() {
        this.stop();
    }


}

