import hyper from 'hyperhtml';
import { MenuRoute } from '../types';

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
  state: any;
  readonly producerState: any;

  render() {
    return hyper.wire(this)`
    <div class="content-page">
      <h2>${getMenuName(this.producerState)}</h2>
    </div>
    `;
  }
}
