// import { remote } from 'electron';
import hyper from 'hyperhtml';
import maestro from 'maestro';

import TitleBar from './components/TitleBar';
import SideBar from './components/sidebar';
import PageContainer from './components/pages/PageContainer';

export default class App extends hyper.Component {
  private sideBar: SideBar;
  private pages: PageContainer;

  constructor() {
    super();
    this.sideBar = new SideBar();
    this.pages = new PageContainer();
    maestro.fregues(this.sideBar.navigation, this.pages);
  }

  private onAppClose = (): void => {
    // remote.getCurrentWindow().close();
  };

  private onAppMinimize = (): void => {
    // remote.getCurrentWindow().minimize();
  };

  public load(projectsList: Project.Metadata[]): void {
    if (this.pages.homePage.load(projectsList)) {
      this.pages.render();
    }
  }

  render(): HTMLElement {
    return this.html`
      ${TitleBar(this.onAppClose, this.onAppMinimize)}
      <div class="content">
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
