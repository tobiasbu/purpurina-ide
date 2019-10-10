import hyper from 'hyperhtml';

import { MenuRoute } from '../types';
import { interpolateClassName } from '../utils';

const icon = require('!svg-inline-loader!../img/icon_projects.svg') as string;
const learn = require('!svg-inline-loader!../img/icon_learn.svg') as string;
const projects = require('!svg-inline-loader!../img/icon_project.svg') as string;
const settings = require('!svg-inline-loader!../img/icon_settings.svg') as string;

const iconDefs = require('!svg-inline-loader!../img/icon_defs.svg') as string;

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
    this.html = hyper.wire(this);
    this.buttonId = 0;
  }

  private onMenuSelect = (id: number, e: MouseEvent) => {
    // const target = e.target as HTMLElement;
    if (this.state.selected === id) {
      return;
    }
    this.setState({
      selected: id,
    });
  }

  private createTab(name: string, optionIcon: string = icon) {
    const onSelect = this.onMenuSelect.bind(this, this.buttonId);
    let className = 'menu-tab';
    if (this.buttonId === this.state.selected) {
      className = className.concat(' selected');
    }

    const el = hyper.wire(this, `:option-${this.buttonId}`)`
      <li>
        <a
        id='${interpolateClassName(name)}'
        class="${className}"
        onclick=${onSelect}
        data-id=${this.buttonId}
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
        ${this.createTab('Projects', projects)}
        ${this.createTab('Learn', learn)}
        ${this.createTab('Settings', settings)}
      </ul>
    </nav>`;
  }
}
