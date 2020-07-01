type EventName = string | symbol;

interface ChannelMap {
  [indexer: string]: ListenerSubscription | ListenerSubscription[];
}

interface IEventEmitter {
  addListener(event: EventName, listener: Callback): this;
  removeListener(event: EventName, listener: Callback): this;
}

interface ListenerSubscription {
  fn: Callback;
  once: boolean;
}

function ListenerSubscription(fn: Callback, once?: boolean) {
  this.fn = fn;
  this.once = once || false;
}

class IPCEmitter implements NodeJS.EventEmitter {
  private emitter: IEventEmitter;
  private registeredChannels: ChannelMap;
  private eventsCounter: number;

  constructor(emitter: IEventEmitter) {
    this.emitter = emitter;
    this.registeredChannels = {};
    this.eventsCounter = 0;
  }

  addListener(
    event: string | symbol,
    listener: Callback,
    once?: boolean
  ): this {
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
  removeListener(
    event: string | symbol,
    listener: (...args: any[]) => void
  ): this {
    this.emitter.removeListener(event, listener);
    return this;
  }
  on(event: string | symbol, listener: (...args: any[]) => void): this {
    return this.addListener(event, listener, false);
  }
  once(event: string | symbol, listener: (...args: any[]) => void): this {
    return this.addListener(event, listener, true);
  }

  off(event: string | symbol, listener: (...args: any[]) => void): this {
    throw new Error('Method not implemented.');
  }
  removeAllListeners(event?: string | symbol): this {
    throw new Error('Method not implemented.');
  }
  setMaxListeners(n: number): this {
    throw new Error('Method not implemented.');
  }
  getMaxListeners(): number {
    throw new Error('Method not implemented.');
  }
  listeners(event: string | symbol): Function[] {
    throw new Error('Method not implemented.');
  }
  rawListeners(event: string | symbol): Function[] {
    throw new Error('Method not implemented.');
  }
  emit(event: string | symbol, ...args: any[]): boolean {
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
