import { Store, ActionGroup } from '../types';
import hyper, { WiredTemplateFunction } from 'hyperhtml';

interface MaestroService<S, A> {
  readonly actions: ActionGroup<A>;
  state(): Readonly<S>;
}

export default function createComponent<S, A>(
  store: Store<S>,
  actionsGroup: ActionGroup<A>
) {
  return function () {
    const getState = store.getState;

    class MaestroComponent<State = {}> extends hyper.Component<State> {
      protected readonly maestro: MaestroService<S, A> = {
        actions: actionsGroup,
        state: getState,
      };

      constructor() {
        super();
        const wrappedRender = function () {
          const originalRender = this.render;
          let isConnected = false;
          return function () {
            if (!isConnected) {
              isConnected = true;
            }
          };
        };
      }

      render?(): WiredTemplateFunction;
    }
  };
}
