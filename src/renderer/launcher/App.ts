import hyper from 'hyperhtml';
import { remote } from 'electron';

import createHeader from './components/createHeader';
import Menu from './components/Menu';
import { action } from './store';

export default class App extends hyper.Component {

  private header: HTMLElement;
  private menu: Menu;

  constructor() {
    super();
    this.html = hyper.wire(this);
    this.header = createHeader(this.onAppClose, this.onAppMinimize);
    this.menu = new Menu();
    // this.test = new MaestroTest();
  }

  private onAppClose = () => {
    remote.getCurrentWindow().close();
  }

  private onAppMinimize = () => {
    remote.getCurrentWindow().minimize();
  }

  private test = () => {
    action.test();
    // console.log('hi');
  }

  render() {

    console.log('RENDER');

    return this.html`
      ${this.header}

      <main class="content">
        <div class="content-wrapper">
          <div class="content-inner-wrapper">
            ${this.menu}
            <div onclick=${this.test}>JUST A TEST</div>
            <div class="content-page">
            </div>
          </div>
        </div>
      </main>
    `;
  }

}
