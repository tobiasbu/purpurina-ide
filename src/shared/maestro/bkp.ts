// import 'document-register-element';
// import HyperHTMLElement from 'hyperhtml-element';
import hyper, { Component } from 'hyperhtml';

// tslint:disable-next-line: variable-name
const _customElementsDefine = window.customElements.define;
window.customElements.define = (name, cl, conf) => {
  if (!customElements.get(name)) {
    _customElementsDefine.call(window.customElements, name, cl, conf);
  } else {
    console.warn(`${name} has been defined twice`);
  }
};

class Connector<T> {
  private originalComponent: T;
  private wrappedComponent: T;
  constructor(component: T) {
    this.originalComponent = component;
  }
}

interface MaestroComponent<T = {}> extends Component<T> {
  render?(): void;
}

interface MaestroComponentConstructor<T extends MaestroComponent> {
  new (...props: any[]): T;
}

// class MaestroConnector extends HyperHTMLElement {

//   private _onconnect: any;

//   // static get observedAttributes() { return ['onconnect']; }

//   constructor(...args) {
//     super();
//     // this._onconnect = null;
//     this.getAttribute('onconnect');
//   }

//   get country() {
//     return this._onconnect;
//   }
//   set country(v) {
//     this.setAttribute('onconnect', v);
//   }

//   connectedCallback() {
//     console.log('hi');
//     console.log('hi-', this.getAttribute('onconnect'));
//   }

//   // connectedCallback() { this.render(); }

// }

// customElements.define('maestro-connector', MaestroConnector);

export function connect<T extends MaestroComponent>(
  component: MaestroComponentConstructor<T>
) {
  // tslint:disable-next-line: function-name

  return function (options: any) {
    return (function () {
      // const wrapped = component;
      function Connector(...props: any[]) {
        const wrapped = new component(props);
        const log = console.log;

        log(options);

        this.html = hyper.wire(this);

        this.onconnected = function () {
          log('CONN a');
        };
        const render = hyper.wire(this)`
          <div onconnected=${this.onconnected}>
          ${wrapped.render()}
          </div>
        `;

        this.render = function () {
          return render;
        };
      }

      Object.defineProperties(Connector.prototype, {
        // used to distinguish better than instanceof
        ELEMENT_NODE: { value: 1 },
        nodeType: { value: -1 },
      });

      return Connector;
    })();
  };
}
