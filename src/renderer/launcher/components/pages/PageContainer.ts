import hyper from 'hyperhtml';

import HomePage from './HomePage';
import CreateProjectPage from './CreateProjectPage';

export default class PageContainer extends hyper.Component {
  readonly producerState: any;
  public readonly homePage: HomePage;
  private createProjectPage: CreateProjectPage;

  constructor() {
    super();
    this.homePage = new HomePage();
    this.createProjectPage = new CreateProjectPage();

  }

  private getCurrentPage() {
    switch (this.producerState.selected) {
      case 0: return this.homePage;
      case 1: return this.createProjectPage;
    }
    return null;
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
