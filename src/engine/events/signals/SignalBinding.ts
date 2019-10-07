import ISignal from "./ISignal";


export default class SignalBinding {

  private _signal: ISignal;
  private active: boolean;
  private args: any[];
  private _isOnce: boolean;
  readonly priority: number;
  readonly _listener: EventCallback;
  readonly _context: object;

  constructor(signal: ISignal, listener: EventCallback, listenerContext: object, priority: number, once: boolean) {

    this._signal = signal;
    this._listener = listener;
    this._context = listenerContext;
    this.priority = priority || 0;
    this.active = true;
    this.args = undefined;
    this._isOnce = once || false;
  }

  get isOnce() { return this._isOnce; }
  //get listener() { return this._listener; }
  get signal() { return this._signal; }

  execute(...argsArray: any[]): any {
    let handlerReturn, params;

    if (this.active && !!this._listener) {

      params = this.args ? this.args.concat(argsArray) : argsArray;
      handlerReturn = this._listener.apply(this._context, params);
      if (this._isOnce) {
        this.detach();
      }

    }
    return handlerReturn;
  }



  detach() {
    if (!this.isBound())
      return;
    this._signal.unsubscribe(this._listener, this._context);
  }

  /**
   * @return {Boolean} `true` if binding is still bound to the signal and have a listener.
   */
  isBound(): boolean {
    return (!!this._signal && !!this._listener);
  }

  /**
      * Delete instance properties
      * @private
      */
  _destroy(): void {
    delete this._signal;
    //delete this.listener;
    //delete this.context;
  }

}
