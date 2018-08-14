import { EventCallback } from "../interfaces";

const prefix = '~';

class EventSubscription {
    callback: EventCallback;
    context: any;
    once: boolean;
    constructor(callback: EventCallback, context: any, once?: boolean) {
        this.callback = callback;
        this.context = context;
        this.once = once || false;
    }
}

class EventsMap {
    [indexer: string]: EventSubscription[] | EventSubscription;
}

/**
 * Clear event by name.
 * @param emitter Reference to the `EventEmitter` instance.
 * @param evt The Event name.
 */
function clearEvent(emitter: EventEmitter, evt: string) {
    if (--emitter._eventsCount === 0) emitter._eventsMap = new EventsMap();
    else delete emitter._eventsMap[evt];
}

/**
 * Add a listener for a given event.
 * @param emitter Reference to the `EventEmitter` instance.
 * @param event The event name.
 * @param fn The listener function.
 * @param context The context to invoke the listener with.
 * @param once Specify if the listener is a one-time listener.
 */
function addListener(emitter: EventEmitter, event: string, fn: EventCallback, context: any, once: boolean) {
    if (typeof fn !== 'function') {
        throw new TypeError('The listener must be a function');
    }

    let listener = new EventSubscription(fn, context || emitter, once);
    const evt = prefix ? prefix + event : event;

    let eventSubscribed = emitter._eventsMap[evt] as EventSubscription;

    if (!eventSubscribed) {
        emitter._eventsMap[evt] = listener;
        emitter._eventsCount++;
    }
    else if (!eventSubscribed.callback) {
        (emitter._eventsMap[evt] as EventSubscription[]).push(listener);
    }
    else {
        let eventSubscriber = [emitter._eventsMap[evt] as EventSubscription, listener];
        emitter._eventsMap[evt] = eventSubscriber;
    }
}

function uniqueListener(listener: EventSubscription | EventSubscription[]): listener is EventSubscription {
    return ((<EventSubscription>listener).callback !== undefined);
}

/**
 * EventEmitter based in https://github.com/primus/eventemitter3
 * @author Arnout Kazemier
 * 
 * Typescript Version by: Tobias Ulrich
 * 
 */
export default class EventEmitter {

    _eventsMap: EventsMap;
    _eventsCount: number;

    /**
     * Minimal `EventEmitter` interface that is molded against the Node.js
     * `EventEmitter` interface.
     *
     * @constructor
     * @public
     */
    constructor() {
        this._eventsMap = new EventsMap();
        this._eventsCount = 0;
    }

    /**
     * Calls each of the listeners registered for a given event.
     * @param event The event name.
     * @param args Arguments
     * @returns `true` if the event had listeners, else `false`.
     */
    emit(event: string, ...args: any[]): boolean {
        const evt = prefix ? prefix + event : event;

        if (!this._eventsMap[evt]) {
            return false;
        }
        const listeners = this._eventsMap[evt];

        if (uniqueListener(listeners)) {
            if (listeners.once) {
                this.unbind(event, listeners.callback, undefined, true);
            }

            listeners.callback.call(listeners.context, args);

        } else {
            const len = listeners.length;

            for (let i = 0; i < len; i++) {
                if (listeners[i].once) {
                    this.unbind(event, listeners[i].callback, undefined, true);
                }
                listeners[i].callback.call(listeners[i].context, args);
            }

        }

        return true;
    }

    /**
     * Add a listener for a given event.
     * @param event The event name.
     * @param callback The listener function.
     * @param context Optional: The context to invoke the listener with.
     * @returns {EventEmitter} `this`
     */
    on(event: string, callback: EventCallback, context?: any): this {
        addListener(this, event, callback, context, false);
        return this;
    }

    /**
     * Add a one-time listener for a given event.
     * @param event The event name.
     * @param callback The listener function.
     * @param context Optional: The context to invoke the listener with.
     * @returns {EventEmitter} `this`
     */
    once(event: string, callback: EventCallback, context?: any): this {
        addListener(this, event, callback, context, true);
        return this;
    }


    /**
     * Remove the listeners of a given event.
     * @param event The event name.
     * @param callback Only remove the listeners that match this function.
     * @param context Only remove the listeners that have this context.
     * @param once  Only remove one-time listeners.
     * @returns {EventEmitter} `this`
     */
    unbind(event: string, callback: EventCallback, context: any, once: boolean): this {
        const evt = prefix ? prefix + event : event;

        if (!this._eventsMap[evt]) {
            return this;
        }
        if (!callback) {
            clearEvent(this, evt);
            return this;
        }

        const listeners = this._eventsMap[evt];

        if (uniqueListener(listeners)) {
            if (listeners.callback === callback &&
                (!once || listeners.once) &&
                (!context || listeners.context === context)) {
                clearEvent(this, evt);
            }
        } else {
            let events: EventSubscription[] = [];
            const length = listeners.length;
            for (let i = 0; i < length; i++) {
                if (listeners[i].callback !== callback ||
                    (once && !listeners[i].once) ||
                    (context && listeners[i].context !== context)) {
                    events.push(listeners[i]);
                }
            }

            if (events.length) {
                this._eventsMap[evt] = (events.length === 1) ? events[0] : events;
            }
            else {
                clearEvent(this, evt);
            }
        }
        return this;

    }

    /**
     * Remove all listeners, or those of the specified event.
     * @param event The event name.
     * @returns {EventEmitter} `this`
     */
    clear(event?: string): this {
        if (event) {
            const evt = prefix ? prefix + event : event;
            if (this._eventsMap[evt]) {
                clearEvent(this, evt)
            }
        } else {
            this._eventsMap = new EventsMap();
            this._eventsCount = 0;
        }

        return this;
    }

    /**
     * Return the number of listeners listening to a given event.
     * @param event The event name.
     * @returns {number} The number of listeners.
     */
    listenerCount(event: string): number {
        const evt = prefix ? prefix + event : event;
        const listeners = this._eventsMap[evt];


        if (!listeners) {
            return 0;
        }

        if (uniqueListener(listeners)) {
            return 1;
        } else {
            listeners.length;
        }

        return 0;

    }



    /**
     * Alias for unbind
     */
    off = this.unbind;

    /**
    * Alias for emit
    */
    trigger = this.emit;

}
