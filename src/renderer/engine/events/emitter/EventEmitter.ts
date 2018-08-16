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

    private _eventsMap: EventsMap;
    private _eventsCount: number;

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
     * Add a listener for a given event.
     * @param emitter Reference to the `EventEmitter` instance.
     * @param event The event name.
     * @param fn The listener function.
     * @param context The context to invoke the listener with.
     * @param once Specify if the listener is a one-time listener.
     */
    private addListener(event: string, fn: EventCallback, context: any, once: boolean) {
        if (typeof fn !== 'function') {
            throw new TypeError('The listener must be a function');
        }

        let listener = new EventSubscription(fn, context || this, once);
        const evt = prefix ? prefix + event : event;

        let eventSubscribed = this._eventsMap[evt] as EventSubscription;

        if (!eventSubscribed) {
            this._eventsMap[evt] = listener;
            this._eventsCount++;
        }
        else if (!eventSubscribed.callback) {
            (this._eventsMap[evt] as EventSubscription[]).push(listener);
        }
        else {
            let eventSubscriber = [this._eventsMap[evt] as EventSubscription, listener];
            this._eventsMap[evt] = eventSubscriber;
        }
    }

    /**
     * Clear event by name.
     * @param emitter Reference to the `EventEmitter` instance.
     * @param evt The Event name.
     */
    private clearEvent(evt: string) {
        if (--this._eventsCount === 0) {
            this._eventsMap = new EventsMap();
        } else {
            delete this._eventsMap[evt];
        }
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
        const argsLen = args.length;

        if (uniqueListener(listeners)) {
            if (listeners.once) {
                this.unbind(event, listeners.callback, undefined, true);
            }

            switch (argsLen) {
                case 1: return listeners.callback.call(listeners.context, args[0]), true;
                case 2: return listeners.callback.call(listeners.context, args[0], args[1]), true;
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
        this.addListener(event, callback, context, false);
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
        this.addListener(event, callback, context, true);
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
            this.clearEvent(evt);
            return this;
        }

        const listeners = this._eventsMap[evt];

        if (uniqueListener(listeners)) {
            if (listeners.callback === callback &&
                (!once || listeners.once) &&
                (!context || listeners.context === context)) {
                this.clearEvent(evt);
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
                this.clearEvent(evt);
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
                this.clearEvent(evt)
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
