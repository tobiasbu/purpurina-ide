import hyper from 'hyperhtml';
import { MenuRoute } from '../types';
import header from './header';

function replaceAll(str: string, searchValue: RegExp, replaceValue: string) {
  return str.replace(new RegExp(searchValue, 'g'), replaceValue);
}

function interpolateClassName(name: string) {
  return replaceAll(name.toLowerCase().trim(), /\s/, '-');
}

interface MenuState {
  selected: MenuRoute;
}

export default class Menu extends hyper.Component<MenuState> {
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

  private createTab(name: string, specialOption: boolean = false) {
    const onSelect = this.onMenuSelect.bind(this, this.buttonId);
    let className = `${!specialOption ? '' : 'special-'}menu-tab`;
    if (this.buttonId === this.state.selected) {
      className = className.concat(' selected');
    }

    const el = hyper.wire(this, `:option-${this.buttonId}`)`
      <li>
        <a
        id='${interpolateClassName(name)}'
        class=${className}
        onclick=${onSelect}
        data-id=${this.buttonId}
        >
          ${name}
        </a>
      </li>
    `;
    this.buttonId += 1;
    return el;
  }

  private createButton(name: string) {
    const el = hyper.wire(this, `:button-${this.buttonId}`)`
      <li>
        <button class="menu-button">
        ${name}
        </button>
      </li>
    `;
    this.buttonId += 1;
    return el;
  }

  render() {
    this.buttonId = 0;
    return this.html`
    <div class="side-bar">
      ${header}
      <nav id='menu'>
        <ul class="menu-list" style="margin-bottom: var(--p-spacing-m)">
          ${this.createTab('Projects')}
          ${this.createTab('Learn')}
          ${this.createTab('Settings')}
        </ul>
      </nav>
    <div>`;
  }

}

// <ul class="menu-list">
//         ${this.createButton('New Project')}
//         ${this.createButton('Open Project')}
//       </ul>
