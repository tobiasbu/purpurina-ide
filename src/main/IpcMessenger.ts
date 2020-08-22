type EventName = string | symbol;

interface ChannelMap {
  [indexer: string]: ListenerSubscription | ListenerSubscription[];
}

interface IEventEmitter {
  addListener(event: EventName, listener: Callback): this;
  removeListener(event: EventName, listener: Callback): this;
  removeAllListeners(event?: EventName): this;
}

interface ListenerSubscription {
  fn: Callback;
  once: boolean;
}

function ListenerSubscription(fn: Callback, once?: boolean) {
  this.fn = fn;
  this.once = once || false;
}

class IpcEmitter implements NodeJS.EventEmitter {
  private emitter: IEventEmitter;
  private registeredChannels: ChannelMap;
  private eventsCounter: number;

  constructor(emitter: IEventEmitter) {
    this.emitter = emitter;
    this.registeredChannels = {};
    this.eventsCounter = 0;
  }

  addListener(event: EventName, listener: Callback, once?: boolean): this {
    const eventName = event as any;
    const channel = this.registeredChannels[eventName];
    const subscription = new ListenerSubscription(
      listener,
      once
    ) as ListenerSubscription;

    if (!channel) {
      this.registeredChannels[eventName] = subscription;
    } else {
      if (Array.isArray(channel)) {
        channel.push(subscription);
      } else {
        const firstSubscription = channel;
        this.registeredChannels[eventName] = [firstSubscription, subscription];
      }
    }
    this.emitter.addListener(event, listener);
    return this;
  }
  removeListener(event: EventName, listener: Callback): this {
    const eventName = event as any;
    if (!this.registeredChannels[eventName]) {
      return this;
    }
    if (!listener) {
      this.removeAllListeners(event);
      return this;
    }

    return this;
  }
  removeAllListeners(event?: EventName): this {
    const eventName = event as any;
    if (--this.eventsCounter === 0) {
      this.registeredChannels = {};
    } else {
      if (this.registeredChannels[eventName]) {
        delete this.registeredChannels[eventName];
      }
    }
    this.emitter.removeAllListeners(event);
    return this;
  }
  on(event: EventName, listener: Callback): this {
    return this.addListener(event, listener, false);
  }
  once(event: EventName, listener: Callback): this {
    return this.addListener(event, listener, true);
  }

  off(event: EventName, listener: Callback): this {
    return this.removeListener(event, listener);
  }

  setMaxListeners(n: number): this {
    throw new Error('Method not implemented.');
  }
  getMaxListeners(): number {
    throw new Error('Method not implemented.');
  }
  listeners(event: EventName): Function[] {
    throw new Error('Method not implemented.');
  }
  rawListeners(event: EventName): Function[] {
    throw new Error('Method not implemented.');
  }
  emit(event: EventName, ...args: any[]): boolean {
    throw new Error('Method not implemented.');
  }
  listenerCount(type: string | symbol): number {
    throw new Error('Method not implemented.');
  }
  prependListener(
    event: string | symbol,
    listener: (...args: any[]) => void
  ): this {
    throw new Error('Method not implemented.');
  }
  prependOnceListener(
    event: string | symbol,
    listener: (...args: any[]) => void
  ): this {
    throw new Error('Method not implemented.');
  }
  eventNames(): (string | symbol)[] {
    throw new Error('Method not implemented.');
  }
}
