import { EventCallback } from "../interfaces";

export default interface ISignal {

    propagate: boolean;
    active: boolean;
    readonly count: number;

    has(listener: EventCallback, context: object): boolean;
    subscribe(listener: EventCallback, context?: object, priority?: number): this;
    subscribeOnce(listener: EventCallback, context?: object, priority?: number): this;
    unsubscribe(listener: EventCallback, context?: object): EventCallback;
    dispatch(...params: any[]): void;
    destroy(): void;
}