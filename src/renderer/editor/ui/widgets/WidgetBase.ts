import { Widget } from '@phosphor/widgets';
import { Message } from '@phosphor/messaging';
import { WidgetResizeEvent } from '../../types/WidgetInterfaces';
import hyper from 'hyperhtml';
import WidgetComponent, { ComponentConstructor } from './WidgetComponent';

// U extends typeof WidgetComponent
export default class WidgetBase<T extends WidgetComponent> extends Widget {
  private componentClass: ComponentConstructor<WidgetComponent>;
  private componentElement: T;
  private contentWidth: number;
  private contentHeight: number;

  public get height(): number {
    return this.contentHeight;
  }
  public get width(): number {
    return this.contentWidth;
  }
  public get ref(): T {
    return this.componentElement;
  }

  constructor(label: string, component: ComponentConstructor<WidgetComponent>) {
    super();

    // this.setFlag(Widget.Flag.DisallowLayout);
    this.title.label = label;
    this.title.closable = true;
    this.title.caption = label;
    this.componentClass = component;

    // this.wrapperElement = document.createElement('div');
    // this.wrapperElement.className = 'p-Widget-wrapper';
    // this.node.appendChild(this.wrapperElement);
  }

  protected onAfterAttach(msg: Message): void {
    this.update();
  }

  protected onCloseRequest(): void {
    if (this.parent) {
      this.parent = null;
    } else if (this.isAttached) {
      Widget.detach(this);
    }
  }

  private createComponent(): void {
    const host = this.node;
    let component: WidgetComponent;
    if (this.componentClass) {
      component = new this.componentClass({
        height: this.contentHeight,
        width: this.contentWidth,
        widget: this,
      });
    }
    this.componentElement = component as T;
    hyper(host)`
      <div class="p-Widget-wrapper">
        ${component ? component : null}
      </div>
    `;

    if (this.onComponentMounted) {
      this.onComponentMounted();
    }
  }

  protected onComponentMounted?(): void;

  protected onUpdateRequest(msg: Message): void {
    this.createComponent();

    console.log('update');

    // const ReactElement = React.createElement<WidgetProps>(this._reactClass, { parent: this });
    // const ReactComponent = ReactDOM.render(ReactElement, host) as InstanceType<U>;
    // ReactComponent.setState({ width: this._width, height: this._height })
    // this._reactComponent = ReactComponent;
    // this._reactElement = ReactElement;

    // this._originalComponentWillUpdate = this._reactComponent.componentWillUpdate;
    // this._reactComponent.componentWillUpdate = this.onUpdate.bind(this);
  }

  protected onResize(msg: Widget.ResizeMessage) {
    // const computed = window.getComputedStyle(this._wrapperElement);
    // const paddingHorizontal = parseFloat(computed.paddingLeft.replace('px','')) +
    // parseFloat(computed.paddingRight.replace('px',''));
    // .getPropertyValue('padding'); //.replace('px',','); //.split(',');
    // const paddingVertical = parseFloat(computed.paddingBottom.replace('px','')) +
    // parseFloat(computed.paddingTop.replace('px',''));

    this.contentWidth = msg.width - 10;
    this.contentHeight = msg.height - 10;

    // rect.x = clientRect.left + window.pageXOffset - document.documentElement.clientLeft;
    // rect.y = clientRect.top + window.pageYOffset - document.documentElement.clientTop;
    if (this.onResizeEvent) {
      this.onResizeEvent({
        width: Math.round(this.contentWidth),
        height: Math.round(this.contentHeight),
      });
    }
  }

  protected onResizeEvent(resizeEvent: WidgetResizeEvent): void {
    if (this.componentElement) {
      this.componentElement.setState({
        width: resizeEvent.width,
        height: resizeEvent.height,
      });
    }
  }

  public send() {}
}
