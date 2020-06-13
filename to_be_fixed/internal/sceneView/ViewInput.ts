import EventEmitter from '../../../engine/events/emitter/EventEmitter';
import CursorTransform from '../managers/pointer/PointerTransform';
import ViewPointer from './ViewPointer';

export default class ViewInput {
  private inputData: CursorTransform;
  private _cursor: ViewPointer;
  public get cursor(): ViewPointer {
    return this._cursor;
  }

  constructor(target: HTMLCanvasElement, emitter: EventEmitter) {
    this.inputData = new CursorTransform(target);
    this._cursor = new ViewPointer(target, emitter, this.inputData);
  }

  resize() {
    this.inputData.updateClientRect();
  }

  init() {
    this._cursor.startListeners();
  }
}
