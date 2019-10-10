import hyper from 'hyperhtml';
import { MenuRoute } from '../types';

import ProjectsPage from '../pages/ProjectsPage';

type PageState = {
  selected: MenuRoute;
};

function getMenuName(state: PageState) {
  switch (state.selected) {
    case MenuRoute.Projects: return 'Projects';
    case MenuRoute.Learn: return 'Learn';
  }
  return 'Home';
}

// tslint:disable-next-line: function-name
export default class PageContainer extends hyper.Component {
  readonly producerState: any;
  private projectPage: ProjectsPage;

  constructor() {
    super();
    this.projectPage = new ProjectsPage();
  }

  private getCurrentPage() {
    switch (this.producerState.selected) {
      case 0: return this.projectPage;
    }
    return null;
  }

  render() {

    const currentPage = this.getCurrentPage();

    return hyper.wire(this)`
    <div class="content-page">
      ${currentPage}
    </div>
    `;
  }
}
