import hyper from 'hyperhtml';
import version from '@shared/version';

import header from './Header';
import Navigation from './Navigation';

export default class SideBar extends hyper.Component {
  readonly navigation: Navigation;

  constructor() {
    super();
    this.navigation = new Navigation();
  }
  render(): HTMLElement {
    return this.html`
    <div class="side-bar">
      ${header}
      ${this.navigation}
      <p id="version">Purpurina Launcher v${version.toString()} ~ ${version.STAGE}</p>
    </div>`;
  }
}
