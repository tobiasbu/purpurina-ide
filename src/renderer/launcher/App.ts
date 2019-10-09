import hyper from 'hyperhtml';
import { remote } from 'electron';
import fregues from 'maestro/fregues';

import titleBar from './components/titleBar';
import Menu from './components/Menu';
import store, { action } from './store';
import PageContainer from './components/PageContainer';

export default class App extends hyper.Component {

  private menu: Menu;
  private pages: any;

  constructor() {
    super();
    this.html = hyper.wire(this);
    this.menu = new Menu();
    this.pages = new PageContainer();
    fregues(this.menu, this.pages);
  }

  private onAppClose = () => {
    remote.getCurrentWindow().close();
  }

  private onAppMinimize = () => {
    remote.getCurrentWindow().minimize();
  }

  render() {

    const { selected } = store.getState();
    let test = 'Welcome!';
    if (selected === 0) {
      test = 'Do more!';
    }

    return this.html`
      ${titleBar(this.onAppClose, this.onAppMinimize)}

      <main class="content">
        <div class="content-wrapper">
          <div class="content-inner-wrapper">
            ${this.menu}
            ${this.pages}
          </div>
        </div>
      </main>
    `;
  }

}
