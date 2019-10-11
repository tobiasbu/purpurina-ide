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
  // private createButton(name: string) {
  //   const el = hyper.wire(this, `:button-${this.buttonId}`)`
  //     <li>
  //       <button class="menu-button">
  //       ${name}
  //       </button>
  //     </li>
  //   `;
  //   this.buttonId += 1;
  //   return el;
  // }

  render() {
    return this.html`
    <div class="side-bar">
      ${header}
      ${this.navigation}
      <p id="version">Purpurina Launcher v${version.toString()} ~ ${version.STAGE}</p>
    </div>`;
  }

}

// <ul class="menu-list">
//         ${this.createButton('New Project')}
//         ${this.createButton('Open Project')}
//       </ul>
