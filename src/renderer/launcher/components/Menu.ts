import hyper from 'hyperhtml';

function replaceAll(str: string, searchValue: RegExp, replaceValue: string) {

  return str.replace(new RegExp(searchValue, 'g'), replaceValue);
}

function interpolateClassName(name: string) {
  return replaceAll(name.toLowerCase().trim(), /\s/, '-');
}

interface MenuState {
  selected: number;
}

export default class Menu extends hyper.Component<MenuState> {
  private buttonId: number;

  state = {
    selected: -1,
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

  private createMenuOption(name:string, specialOption: boolean = false) {
    const onSelect = this.onMenuSelect.bind(this, this.buttonId);
    let className = `${!specialOption ? '' : 'special-'}option`;
    if (this.buttonId === this.state.selected) {
      className = className.concat(' selected');
    }

    const el = hyper.wire(this, `:button-${this.buttonId}`)`
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

  render() {
    this.buttonId = 0;
    return this.html`
    <nav id='menu'>
      <ul class="menu-list" style="margin-bottom: var(--p-spacing-m)">
        ${this.createMenuOption('Projects')}
        ${this.createMenuOption('Learn')}
      </ul>
      <ul class="menu-list">
        ${this.createMenuOption('New Project', true)}
        ${this.createMenuOption('Open Project', true)}
      </ul>
    </nav>`;
  }

}
