import { Producer, ActionProducer, ActionGroup } from '../types';

export function createActionUtility<S>(producer: Producer<S>) {

  return function createAction<A>(actionsProducer: ActionProducer<S, A>): ActionGroup<A> {
    const actions = actionsProducer(producer);
    return actions;
  };

}

// TODO
export function combineActionGroups(...groups: ActionGroup<any>[]): void {

  const len =  groups.length;

  if (len <= 0) {
    return;
  }

  const combined = {};
  const duplicates = {};

  // Check actions with same name
  for (let i = 0; i < groups.length; i += 1) {

  }

  for (let i = 0; i < groups.length; i += 1) {

  }

}
