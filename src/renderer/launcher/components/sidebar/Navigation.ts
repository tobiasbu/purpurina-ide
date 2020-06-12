import hyper from 'hyperhtml';

import { interpolateClassName } from '../../utils';

import stars = require('../../img/icon_stars.svg');
import learn = require('../../img/icon_learn.svg');
import home = require('../../img/icon_home.svg');
import settings = require('../../img/icon_settings.svg');
import iconDefs = require('../../img/icon_defs.svg');

interface MenuState {
  selected: number;
}

export default class Navigation extends hyper.Component<MenuState> {
  private buttonId: number;

  state = {
    selected: 0,
  };

  constructor() {
    super();
    this.buttonId = 0;
  }

  private onMenuSelect = (id: number, e: MouseEvent): void => {
    // const target = e.target as HTMLElement;
    // e.preventDefault();
    (document.activeElement as HTMLElement).blur();
    // target.focus({ preventScroll: true });
    if (this.state.selected === id) {
      return;
    }
    this.setState({
      selected: id,
    });
  };

  private onMenuDown = (e: MouseEvent): void => {
    e.preventDefault();
  };

  private onKeyUp = (e: KeyboardEvent): void => {
    if (e.keyCode === 13 || e.keyCode === 32) {
      (e.target as HTMLElement).blur();
    }
  };

  private createTab(name: string, optionIcon: string = stars): HTMLElement {
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
        onclick=${(e: MouseEvent): void => {
          this.onMenuSelect(id, e);
        }}
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

  render(): HTMLElement {
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
