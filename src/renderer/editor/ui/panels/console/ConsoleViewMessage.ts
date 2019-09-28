import { ConsoleMessagePayload } from '../../../log/types';
import hyper from 'hyperhtml';

export default class ConsoleViewMessage extends hyper.Component {
  public readonly message: ConsoleMessagePayload;

  constructor(payload: ConsoleMessagePayload) {
    super();
    this.message = payload;
  }

  render() {
    return null;
  }

}
