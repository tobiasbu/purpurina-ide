import hyper, { Component } from 'hyperhtml';

export interface ScrollContainerOptions {
  width: number;
  height: number;
}

const nativeScrollBarWidth = 17;

/// TODO
export default class ScrollContainer<T extends Component> extends Component {

  public readonly component: T;
  private offsetElement: HTMLElement;
  private maskElement: HTMLElement;
  private contentElement: HTMLElement;

  // private _isRtl: boolean;
  // private options: ScrollContainerOptions;

  constructor(component: T) {
    super();
    this.component = component;

    this.init();
  }

  private init() {
    this.offsetElement = hyper()`<div class='scrollcontainer-offset'/>`;
    this.maskElement = hyper()`<div class='scrollcontainer-mask'/>`;
    this.contentElement = hyper()`
            <div class= 'scrollcontainer-content'>
                ${this.component}
            </div>
        `;

    this.maskElement.appendChild(this.offsetElement);
    this.offsetElement.appendChild(this.contentElement);

    this.hideNativeScroll();
  }

  private hideNativeScroll() {
    this.offsetElement.style['right'] = `-${nativeScrollBarWidth}px`;
    this.offsetElement.style.bottom = `-${nativeScrollBarWidth}px`;
  }

  render() {
    return hyper.wire(this)`
        <div data-scrollcontainer style="width:100%; height:480px">
            <div class='scrollcontainer-wrapper' >
                ${this.maskElement}
            </div>
        </div>
        `;
  }

}
