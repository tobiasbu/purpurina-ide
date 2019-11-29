import { Store, ActionGroup, Constructor, IComponent, ComponentTypes, RemoveListener } from './types';
import memoize from './lib/memoize';

function isConstructor<T = any>(obj: any): obj is Constructor<T> {
  if (typeof obj === 'function') {
    try {
      Reflect.construct(String, [], obj);
    } catch (e) {
      return false;
    }
    return true;
  }
  return false;
}

function isComponent(obj: any): obj is Constructor<IComponent> {
  if (isConstructor(obj) && obj.prototype.nodeType === -1) {
    return true;
  }
  return false;
}

export default function listen<S, A>(
  store: Store<S>, component: ComponentTypes, actions?: ActionGroup<A>,
) {

  let parentNode: ParentNode;
  let currentEl: HTMLElement;
  let componentRender: () => HTMLElement;
  let removeListener: RemoveListener;
  const previousState = memoize(() => store.getState(), store);

  if (typeof component === 'function') {

    if (isComponent(component)) {
      componentRender = (function () {
        const wrap = new component();
        return function () {
          if (typeof wrap.render === 'function') {
            return wrap.render();
          }
          return null;
        };
      })();
    } else {
      componentRender = function () { return component(store.getState(), actions); };
    }
  }

  function wrapRender() {
    const el = componentRender();
    if (currentEl !== el) {
      currentEl = el;
    }
    const parent = currentEl.parentNode;
    if (parentNode !== parentNode) {
      parentNode = parent;
    }
    return currentEl;
  }

  removeListener = store.addListener(handleChanges);

  function handleChanges() {
    const newState = store.getState();
    if (previousState.get() === newState) {
      return;
    }
    wrapRender();
    previousState.update(store);

    // removeListener();
    // removeListener = null;
    // removeListener = store.addListener(handleChanges);
  }

  return wrapRender;

  // function createMutationObserver(target: Element) {
  //   let mo = new MutationObserver(mutations => {

  //   });
  //   mo.observe(target, { childList: true });
  // }

  // let isConnected = false;

}
