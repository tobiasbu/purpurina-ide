import hyper from 'hyperhtml';
import { remote } from 'electron';
import fregues from 'maestro/fregues';

import titleBar from './components/titleBar';
import SideBar from './components/SideBar';
import PageContainer from './pages/PageContainer';

export default class App extends hyper.Component {

  private sideBar: SideBar;
  private pages: any;

  constructor() {
    super();
    this.html = hyper.wire(this);
    this.sideBar = new SideBar();
    this.pages = new PageContainer();
    fregues(this.sideBar.navigation, this.pages);
  }

  private onAppClose = () => {
    remote.getCurrentWindow().close();
  }

  private onAppMinimize = () => {
    remote.getCurrentWindow().minimize();
  }

  render() {
    return this.html`
      ${titleBar(this.onAppClose, this.onAppMinimize)}
      <main class="content">
        <div class="content-wrapper">
          <div class="content-inner-wrapper">
            ${this.sideBar}
            ${this.pages}
          </div>
        </div>
      </main>
    `;
  }

}
