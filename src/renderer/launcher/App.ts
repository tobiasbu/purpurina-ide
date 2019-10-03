import hyper from 'hyperhtml';
import { remote } from 'electron';

import createHeader from './components/createHeader';
import Menu from './components/Menu';

export default class App extends hyper.Component {

  private header: HTMLElement;
  menu: Menu;

  constructor() {
    super();
    this.html = hyper.wire(this);
    this.header = createHeader(this.onAppClose, this.onAppMinimize);
    this.menu = new Menu();
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
        ${this.menu}
        </div>
      </main>
    `;
  }

}
