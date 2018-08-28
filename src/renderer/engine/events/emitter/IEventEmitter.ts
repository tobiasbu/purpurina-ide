
export type EventCallback = (...args: any[]) => void;

/**
 * Event Emitter interface
 */
export interface IEventEmitter {

    /**
     * Calls each of the listeners registered for a given event.
     * @param event The event name.
     * @param args Arguments
     * @returns `true` if the event had listeners, else `false`.
     */
    emit(event: string, ...args: any[]): boolean

    /**
     * Add a listener for a given event.
     * @param event The event name.
     * @param callback The listener function.
     * @param context Optional: The context to invoke the listener with.
     * @returns {EventEmitter} `this`
     */
    on(event: string, callback: EventCallback, context?: any): this;

    /**
     * Add a one-time listener for a given event.
     * @param event The event name.
     * @param callback The listener function.
     * @param context Optional: The context to invoke the listener with.
     * @returns {EventEmitter} `this`
     */
    once(event: string, callback: EventCallback, context?: any): this;

    /**
     * Remove the listeners of a given event.
     * @param event The event name.
     * @param callback Only remove the listeners that match this function.
     * @param context Only remove the listeners that have this context.
     * @param once  Only remove one-time listeners.
     * @returns {EventEmitter} `this`
     */
    unbind(event: string, callback: EventCallback, context: any, once: boolean): this;


    /**
     * Remove all listeners, or those of the specified event.
     * @param event The event name.
     * @returns {EventEmitter} `this`
     */
    clear(event?: string): this;

    /**
     * Return the number of listeners listening to a given event.
     * @param event The event name.
     * @returns {number} The number of listeners.
     */
    listenerCount(event: string): number;

    hasListeners(event:string):boolean;
}