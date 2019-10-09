import mergerino from 'mergerino';

import { MaestroComponent } from './types';
import memoize from './lib/memoize';
import isPlainObject from './lib/isPlainObject';

type SetState<S, Component> = (
  state: Partial<S> | ((this: Component, state: S) => Partial<S>), render?: boolean,
) => Component;

interface ConsumerComponent<S = {}, PS = {}> extends MaestroComponent<S> {
  producerState?: PS;
  onConsume?(): void;
}

interface FreguesiaOptions {
  immutable?: boolean;
}

function freguesia<S, C extends MaestroComponent<S>>(
  options: FreguesiaOptions, producer: C, ...consumers: ConsumerComponent[]
): void;
function freguesia<S, C extends MaestroComponent<S>>(
  producer: C, ...consumers: ConsumerComponent[]
): void;
function freguesia<S, C extends MaestroComponent<S>>(): void {

  let ia = 0;
  let isImmutable = false;
  // has options?
  if (isPlainObject(arguments[0])) {
    const opts = arguments[0] as FreguesiaOptions;
    isImmutable = opts.immutable || true;
    ia += 1;
  }

  const producer = arguments[ia];
  ia += 1;
  const consumers = [].slice.call(arguments, ia, arguments.length);
  const argLen = consumers.length;

  if (argLen <= 0) {
    console.error('Maestro: Could not create a freguesia. There is no any consumer.');
    return null;
  }

  function updateConsumers(state: S) {
    for (let i = 0; i < consumers.length; i += 1) {
      const consumer = consumers[i];
      // if (typeof consumer === 'object') {
      consumer.producerState = state;
      if (typeof consumer.onConsume === 'function') {
        consumer.onConsume();
      }
      if (typeof consumer.render === 'function') {
        consumer.render();
      }
    }
  }

  const memo = memoize(() => {
    if (isImmutable) {
      return Object.freeze(mergerino({}, producer.state));
    }
    return producer.state;
  });

  updateConsumers(memo.get());

  // const consumers = arguments;
  const originalSetState = producer.setState.bind(producer);
  const produce: SetState<S, C> = function (
    state: Partial<S> | ((this: C, state: S) => Partial<S>), render?: boolean,
  ) {
    const self = originalSetState(state, render);
    updateConsumers(memo.get());
    return self;
  };
  producer.setState = produce;

}

export default freguesia;
