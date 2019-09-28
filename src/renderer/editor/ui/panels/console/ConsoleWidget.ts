import WidgetBase from '../../widgets/WidgetBase';
import ConsoleComponent from './ConsoleComponent';
import { IConsoleWidget, ConsoleMessagePayload } from '../../../log/types';
import LoggerMiddleware from '../../../log/LoggerMiddleware';

export default class ConsoleWidget
  extends WidgetBase<ConsoleComponent, typeof ConsoleComponent> implements IConsoleWidget {

  constructor() {
    super('Console', ConsoleComponent);
  }

  protected onComponentMounted(): void {
    LoggerMiddleware.widgetConsole = this;
  }

  onLog(payload: ConsoleMessagePayload): void {
    if (this.ref) {
      this.ref.onLog(payload);
    }
  }

}
