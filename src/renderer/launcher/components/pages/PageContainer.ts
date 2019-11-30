import hyper from 'hyperhtml';

import HomePage from './HomePage';
import CreateProjectPage from './CreateProjectPage';

export default class PageContainer extends hyper.Component {
  readonly producerState: any;
  public readonly homePage: HomePage;
  private createProjectPage: CreateProjectPage;
  private lastPage: number;

  constructor() {
    super();
    this.homePage = new HomePage();
    this.createProjectPage = new CreateProjectPage();
    this.lastPage = 0;
  }

  private getCurrentPage(): HomePage | CreateProjectPage {
    let page: HomePage | CreateProjectPage = null;
    switch (this.producerState.selected) {
      default:
        break;
      case 0:
        page = this.homePage;
        break;
      case 1:
        page = this.createProjectPage;
        break;
    }

    if (page && this.lastPage === 1) {
      this.createProjectPage.reset();
    }

    this.lastPage = this.producerState.selected;
    return page;
  }

  render() {
    const currentPage = this.getCurrentPage();
    const title = (currentPage) ? currentPage.title : 'No Title';
    return this.html`
    <main class="content-page">
      <div class="page-top-bar">
        <h1>${title}</h1>
      </div>
      ${currentPage}
    </main>
    `;
  }
}
