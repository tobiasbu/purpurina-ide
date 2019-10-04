import hyper from 'hyperhtml';
import { remote } from 'electron';

import createHeader from './components/createHeader';
import Menu from './components/Menu';
import { connect } from './maestro';

class Test extends hyper.Component {
  render() {
    return hyper.wire(this)`
      wrapped hi
    `;
  }
}

const MaestroTest = connect(Test);

export default class App extends hyper.Component {

  private header: HTMLElement;
  private menu: Menu;
  test: any;

  constructor() {
    super();
    this.html = hyper.wire(this);
    this.header = createHeader(this.onAppClose, this.onAppMinimize);
    this.menu = new Menu();
    this.test = new MaestroTest();
  }

  private onAppClose = () => {
    remote.getCurrentWindow().close();
  }

  private onAppMinimize = () => {
    remote.getCurrentWindow().minimize();
  }

  render() {
    return this.html`
      ${this.header}
      <main class="content">
        <div class="content-wrapper">
          <div class="content-inner-wrapper">
            ${this.menu}
            <div class="content-page">
            ${this.test}
            </div>
          </div>
        </div>
      </main>
    `;
  }

}
