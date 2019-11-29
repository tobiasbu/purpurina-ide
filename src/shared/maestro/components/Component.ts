import hyper, { WiredTemplateFunction } from 'hyperhtml';

import { IComponent } from '../types';

// tslint:disable-next-line: function-name
class Component<S = {}> implements IComponent<S> {
  protected readonly html: WiredTemplateFunction;
  readonly state: S;
  constructor() {
    this.html = hyper.wire(this);
  }
  render?(): HTMLElement | string | boolean | number;
  setState(state: Partial<S> | ((this: this, state: S) => Partial<S>), render?: boolean): this {
    const target = this.state;
    const source = typeof state === 'function' ? state.call(this, target) : state;
    for (const key in source) target[key] = source[key];
    if (render !== false) {
      this.render();
    }
    return this;
  }
}

Object.defineProperties(
  Component.prototype,
  {
    // used to distinguish better than instanceof
    ELEMENT_NODE: { value: 1 },
    nodeType: { value: -1 },
  },
);

export default Component;
