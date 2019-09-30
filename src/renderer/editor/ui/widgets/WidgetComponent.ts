import hyper from 'hyperhtml';
import { IWidgetBase } from './IWidgetBase';

export interface ComponentState {
  width: number;
  height: number;
}

export interface ComponentProps {
  widget: IWidgetBase;
  width?: number;
  height?: number;
}

export interface ComponentConstructor<T> {
  new(...args:any[]): T;
}

export class ComponentBase<P extends ComponentProps, S extends ComponentState>
 extends hyper.Component<S> {
  protected readonly props: Readonly<P>;
  // state = {
  //   width: 0,
  // };
  constructor(props: P) {
    super();
    this.props = props;
    this.state = <S>{
      width: (props) ? (props.width || 0) : 0,
      height: (props) ? (props.height || 0) : 0,
    };
  }
}

// type ClassType<P extends ComponentProps,
//  T extends ComponentBase<P, ComponentState>, C extends ComponentBase<P>> =
//         C &
//         (new (props: P, context?: any) => T);

// export class WidgetComponent<S extends ComponentState>
// extends ComponentBase<ComponentProps, S> {
//   constructor(props: P) {
//     super();
//     this.props = props;
//   }
// }

// export default class WidgetComponent <S = ComponentState>
// extends ComponentBase<ComponentProps, S> {

// }

// export interface WidgetComponent<P extends ComponentProps, S extends ComponentState>
//  extends ComponentBase<P, S> { }
export default class WidgetComponent<S extends ComponentState = ComponentState>
extends ComponentBase<ComponentProps, S>  {

}
