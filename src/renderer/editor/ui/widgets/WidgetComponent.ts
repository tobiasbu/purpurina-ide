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

export default class WidgetComponent extends hyper.Component<ComponentState> {

  protected props: ComponentProps;

  state = {
    width: 0,
    height: 0,
  };

  constructor(props: ComponentProps) {
    super();
    this.props = props;
    this.state = {
      width: (props) ? (props.width || 1) : 1,
      height: (props) ? (props.height || 1) : 1,
    };
  }

}
