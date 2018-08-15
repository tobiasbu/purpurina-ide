/** @license
 * JS Signals <http://millermedeiros.github.com/js-signals/>
 * Released under the MIT license
 * Author: Miller Medeiros
 * Version: ::VERSION_NUMBER:: - Build: ::BUILD_NUMBER:: (::BUILD_DATE::)
*/

import SignalBinding from './SignalBinding';
import List from '../../structures/List';
import ISignal from './ISignal';
import { validateListener, registerListener, indexOfListener } from './signalComponents';
import { EventCallback } from '../interfaces';



// Based on https://github.com/millermedeiros/js-signals
/**
* Custom event broadcaster
* Inspired by Robert Penner's AS3 Signals.
* @name Signal
* @author Miller Medeiros
* @class
*/
export default class Signal implements ISignal {

    _bindings: List<SignalBinding>;
    private _shouldPropagate: boolean;
    active: boolean;


    /**
     * @constructor
     */
    constructor() {
        this._bindings = new List();
        this.active = true;
        this._shouldPropagate = true;
    }

    set propagate(value) { this._shouldPropagate = value; }
    get propagate() { return this._shouldPropagate; }
    get count() { return this._bindings.size; }


    /**
     * Check if listener was attached to Signal.
     * @param {Function} listener The listener
     * @param {Object} [context] Context
     * @return {boolean} if Signal has the specified listener.
     */
    has(listener: EventCallback, context: object): boolean {
        return indexOfListener(this, listener, context) !== -1;
    }

    /**
     * Add a listener to the signal.
     * @param {SignalCallback} listener Signal handler function.
     * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
     * @param {Number} [priority] The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
     * @return {Signal} return this signal.
     */
    subscribe(listener: EventCallback, context?: object, priority?: number): this {
        validateListener(listener, 'subscribe');
        registerListener(this, listener, context, priority, false);
        return this;
    }

    subscribeOnce(listener: EventCallback, context?: object, priority?: number): this {
        validateListener(listener, 'subscribeOnce');
        registerListener(this, listener, context, priority, true);
        return this;
    }

    /**
     * Remove a single listener from the dispatch queue.
     * @param {SignalCallback} listener Handler function that should be removed.
     * @param {Object} [context] Execution context (since you can add the same handler multiple times if executing in a different context).
     * @return {Function} Listener handler function.
     */
    unsubscribe(listener: EventCallback, context?: object): EventCallback {
        validateListener(listener, 'unsubscribe');

        let i = indexOfListener(this, listener, context);
        if (i !== -1) {
            this._bindings.at(i)._destroy();
            this._bindings.eraseAt(i);

        }

        return listener;
    }

    unsubscribeAll() {

    }

    /**
   * Dispatch/Broadcast Signal to all listeners added to the queue.
   * @param {...*} [params] Parameters that should be passed to each handler.
   */
    dispatch(...params: any[]) {
        if (!this.active)
            return;

        let size = this._bindings.length;

        if (!size)
            return;

        let paramsSize = params.length;

        if (paramsSize > 1) {
            params = Array.prototype.slice.call(params);
        }

        let binds = this._bindings.contents.slice();

        do { size--; }
        while (binds[size] && this._shouldPropagate && binds[size].execute(params) !== false);
    }

    destroy() {
        this.unsubscribeAll();
        delete this._bindings;
    }

}