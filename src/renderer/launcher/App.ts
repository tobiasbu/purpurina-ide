import hyper from 'hyperhtml';
import { remote } from 'electron';
import fregues from 'maestro/fregues';

import TitleBar from './components/TitleBar';
import SideBar from './components/sidebar';
import PageContainer from './components/pages/PageContainer';
import { IProjectInfo } from 'shared/types';

export default class App extends hyper.Component {

  private sideBar: SideBar;
  private pages: PageContainer;

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

  public load(projectsList: IProjectInfo[]) {
    if (this.pages.homePage.load(projectsList)) {
      this.pages.render();
    }
  }

  render() {
    return this.html`
      ${TitleBar(this.onAppClose, this.onAppMinimize)}
      <div class="content" tabindex="-1">
        <div class="content-wrapper">
          <div class="content-inner-wrapper">
            ${this.sideBar}
            ${this.pages}
          </div>
        </div>
      </div>
    `;
  }

}
