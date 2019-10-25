import hyper from 'hyperhtml';

import header from './Header';
import version from 'shared/version';
import Navigation from './Navigation';

export default class SideBar extends hyper.Component {

  readonly navigation: Navigation;

  constructor() {
    super();
    this.navigation = new Navigation();
  }
  render() {
    return this.html`
    <div class="side-bar">
      ${header}
      ${this.navigation}
      <p id="version">Purpurina Launcher v${version.toString()} ~ ${version.STAGE}</p>
    </div>`;
  }

}
