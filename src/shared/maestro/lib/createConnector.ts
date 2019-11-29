import hyper from 'hyperhtml';

import { IComponent, Constructor, Store } from '../types';

export default function <S>(store: Store<S>) {

  return function connect<T extends IComponent>(component: Constructor<T>) {

    return function (options: any) {

      return (function () {
        // tslint:disable-next-line: function-name
        function Connector(...props: any[]) {
          const wrapped = new component(props);
          const log = console.log;

          log(options);

          this.html = hyper.wire(this);

          const onconnected = function () {
            log('CONN a');
            console.log(JSON.stringify(store));
          };

          this.render = function () {
            return this.html`
              <div onconnected=${onconnected}>
              ${wrapped.render()}
              </div>
            `;
          };
        }

        Object.defineProperties(
          Connector.prototype,
          {
            // used to distinguish better than instanceof
            ELEMENT_NODE: { value: 1 },
            nodeType: { value: -1 },
          },
        );

        return Connector;
      })();

    };
  };
}
