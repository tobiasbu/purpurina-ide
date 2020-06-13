import { IEventEmitter } from './IEventEmitter';

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

function uniqueListener(
  listener: EventSubscription | EventSubscription[]
): listener is EventSubscription {
  return (<EventSubscription>listener).callback !== undefined;
}

/**
 * EventEmitter based in https://github.com/primus/eventemitter3
 * @author Arnout Kazemier
 *
 * Typescript Version by: Tobias Ulrich
 *
 */
export default class EventEmitter implements IEventEmitter {
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
  private addListener(
    event: string,
    fn: EventCallback,
    context: any,
    once: boolean
  ) {
    if (typeof fn !== 'function') {
      throw new TypeError('The listener must be a function');
    }

    let listener = new EventSubscription(fn, context || this, once);
    const evt = prefix ? prefix + event : event;

    let eventSubscribed = this._eventsMap[evt] as EventSubscription;

    if (!eventSubscribed) {
      this._eventsMap[evt] = listener;
      this._eventsCount++;
    } else if (!eventSubscribed.callback) {
      (this._eventsMap[evt] as EventSubscription[]).push(listener);
    } else {
      let eventSubscriber = [
        this._eventsMap[evt] as EventSubscription,
        listener,
      ];
      this._eventsMap[evt] = eventSubscriber;
    }
  }

  /**
   * Clear event by name.
   * @param emitter Reference to the `EventEmitter` instance.
   * @param evt The Event name.
   */
  private clearEvent(evt: string): void {
    if (--this._eventsCount === 0) {
      this._eventsMap = new EventsMap();
    } else {
      delete this._eventsMap[evt];
    }
  }

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
        case 1:
          return listeners.callback.call(listeners.context, args[0]), true;
        case 2:
          return (
            listeners.callback.call(listeners.context, args[0], args[1]), true
          );
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

  on(event: string, callback: EventCallback, context?: any): this {
    this.addListener(event, callback, context, false);
    return this;
  }

  once(event: string, callback: EventCallback, context?: any): this {
    this.addListener(event, callback, context, true);
    return this;
  }

  unbind(
    event: string,
    callback: EventCallback,
    context: any,
    once: boolean
  ): this {
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
      if (
        listeners.callback === callback &&
        (!once || listeners.once) &&
        (!context || listeners.context === context)
      ) {
        this.clearEvent(evt);
      }
    } else {
      let events: EventSubscription[] = [];
      const length = listeners.length;
      for (let i = 0; i < length; i++) {
        if (
          listeners[i].callback !== callback ||
          (once && !listeners[i].once) ||
          (context && listeners[i].context !== context)
        ) {
          events.push(listeners[i]);
        }
      }

      if (events.length) {
        this._eventsMap[evt] = events.length === 1 ? events[0] : events;
      } else {
        this.clearEvent(evt);
      }
    }
    return this;
  }

  clear(event?: string): this {
    if (event) {
      const evt = prefix ? prefix + event : event;
      if (this._eventsMap[evt]) {
        this.clearEvent(evt);
      }
    } else {
      this._eventsMap = new EventsMap();
      this._eventsCount = 0;
    }

    return this;
  }

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

  hasListeners(event: string): boolean {
    const evt = prefix ? prefix + event : event;
    const listeners = this._eventsMap[evt];
    return listeners !== undefined;
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
