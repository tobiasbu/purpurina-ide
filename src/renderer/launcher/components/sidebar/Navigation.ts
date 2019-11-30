import hyper from 'hyperhtml';

import { MenuRoute } from '../../types';
import { interpolateClassName } from '../../utils';

const stars = require('!svg-inline-loader!../../img/icon_stars.svg') as string;
const learn = require('!svg-inline-loader!../../img/icon_learn.svg') as string;
const home = require('!svg-inline-loader!../../img/icon_home.svg') as string;
const settings = require('!svg-inline-loader!../../img/icon_settings.svg') as string;

const iconDefs = require('!svg-inline-loader!../../img/icon_defs.svg') as string;

interface MenuState {
  selected: MenuRoute;
}

export default class Navigation extends hyper.Component<MenuState> {

  private buttonId: number;

  state = {
    selected: MenuRoute.Projects,
  };

  constructor() {
    super();
    this.buttonId = 0;
  }

  private onMenuSelect = (id: number, e: MouseEvent) => {
    const target = e.target as HTMLElement;
    // e.preventDefault();
    (document.activeElement as HTMLElement).blur();
    // target.focus({ preventScroll: true });
    if (this.state.selected === id) {
      return;
    }
    this.setState({
      selected: id,
    });
  }

  private onMenuDown = (e: MouseEvent) => {
    e.preventDefault();
  }

  private onKeyUp = (e: KeyboardEvent) => {
    if (e.keyCode === 13 || e.keyCode === 32) {
      (e.target as HTMLElement).blur();
    }
  }

  private createTab(name: string, optionIcon: string = stars) {
    const id = this.buttonId;
    let className = 'menu-option';
    let ariaCurrent = null;
    if (this.buttonId === this.state.selected) {
      className = className.concat(' selected');
      ariaCurrent = 'page';
    }

    const el = hyper.wire(this, `:option-${this.buttonId}`)`
      <li>
        <a
        id='${interpolateClassName(name)}'
        class="${className}"
        onmousedown=${this.onMenuDown}
        onkeyup=${this.onKeyUp}
        onclick=${(e) => { this.onMenuSelect(id, e); }}
        aria-current=${ariaCurrent}
        href=""
        >
          <span class="icon">${{ html: optionIcon }}</span>
          <span class="name">${name}</span>
        </a>
      </li>
    `;
    this.buttonId += 1;
    return el;
  }

  render() {
    this.buttonId = 0;

    return this.html`
    ${{ html: iconDefs }}
    <nav id='menu'>
      <ul class="menu-list" style="margin-bottom: var(--p-spacing-m)">
        ${this.createTab('Home', home)}
        ${this.createTab('New Project', stars)}
        ${this.createTab('Learn', learn)}
        ${this.createTab('Settings', settings)}
      </ul>
    </nav>`;
  }
}
