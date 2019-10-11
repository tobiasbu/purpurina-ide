import hyper from 'hyperhtml';
import ProjectsPage from './ProjectsPage';
import CreateProjectPage from './CreateProjectPage';

export default class PageContainer extends hyper.Component {
  readonly producerState: any;
  private projectPage: ProjectsPage;
  private createProjectPage: CreateProjectPage;

  constructor() {
    super();
    this.projectPage = new ProjectsPage();
    this.createProjectPage = new CreateProjectPage();
  }

  private getCurrentPage() {
    switch (this.producerState.selected) {
      case 0: return this.projectPage;
      case 1: return this.createProjectPage;
    }
    return null;
  }

  render() {

    const currentPage = this.getCurrentPage();

    return hyper.wire(this)`
    <div class="content-page">
      <div class="page-top-bar">
        <h1>${currentPage && currentPage.title}</h1>
      </div>
      ${currentPage}
    </div>
    `;
  }
}
