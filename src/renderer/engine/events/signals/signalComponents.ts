import Signal from "./Signal";
import SignalBinding from "./SignalBinding";
import { EventCallback } from "../interfaces";


export function addBinding(signal: Signal, binding: SignalBinding): void {

    let n = signal._bindings.length;

    do { --n; } while (signal._bindings.at(n) && binding.priority <= signal._bindings.at(n).priority);

    signal._bindings.insert(binding, n);
}

export function indexOfListener(signal: Signal, listener: EventCallback, context: object): number {

    let r = signal._bindings.each(
        function (element: SignalBinding, index: number) {

            if (element._listener === listener && element._context === context) {
                return index;
            }

        });


    if (r === undefined)
        r = -1;

    return r;
}

export function validateListener(listener: EventCallback, func: string): void {
    if (typeof listener !== 'function')
        throw new Error('Signal.{fn}: Listener should be a function.'.replace('{fn}', func));

}

export function registerListener(signal: Signal, listener: EventCallback, listenerContext: object, priority: number, isOnce: boolean): SignalBinding {

    let binding = null;
    let index = indexOfListener(signal, listener, listenerContext);

    if (index !== -1) {
        binding = signal._bindings[index];
        if (binding.isOnce !== isOnce) {
            throw new Error('You cannot add' + (isOnce ? '' : 'Once') + '() then add' + (!isOnce ? '' : 'Once') + '() the same listener without removing the relationship first.');
        }
    } else {

        binding = new SignalBinding(signal, listener, listenerContext, priority, isOnce);
        addBinding(signal, binding);
    }

    return binding;

}