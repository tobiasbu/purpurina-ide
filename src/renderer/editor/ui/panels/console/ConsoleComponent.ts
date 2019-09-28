import hyper from 'hyperhtml';
import WidgetComponent, { ComponentProps } from '../../widgets/WidgetComponent';
import { ConsoleMessagePayload } from '../../../log/types';
import LoggerMiddleware from '../../../log/LoggerMiddleware';
import { parseMessage } from './parseMessage';

export default class ConsoleComponent extends WidgetComponent {

  private logList: ConsoleMessagePayload[];

  constructor(props: ComponentProps) {
    super(props);
    this.logList = [];
  }

  public onLog(payload: ConsoleMessagePayload) {
    this.logList.push(payload);
    this.render();
  }

  private onClear = () => {
    this.logList.length = 0;
    console.clear();
    this.render();
  }

  private onSelectLog = (e: MouseEvent) => {
    LoggerMiddleware.original.log(e);
    // (e.target as HTMLElement).style.background = '#fff';
  }

  private renderLogItem(msgPayload: ConsoleMessagePayload, index: number) {

    // const logType = (msgPayload.type === MessageLogType.Info) ?
    //   'LOG' : (msgPayload.type === MessageLogType.Warn) ? 'WARN' : 'ERROR';

    LoggerMiddleware.original.log(msgPayload);

    // const output = msgPayload.message;
    // const type = typeof (output);
    // if (type === 'string') {
    //   // output = (output as string).replace(/(?:\r\n|\r|\n)/g, '<br>');
    // }

    return hyper.wire(this, `:console-item-${index}`)`
            <li onclick=${this.onSelectLog}>
              <!-- <div> -->
                <div class="console-icon">
                  <i class="icon">&#x24D8;</i>
                </div>
              <div class="console-message">
                <span class="str">${parseMessage(msgPayload)} | ${msgPayload.st}</span>
              </div>
              <!-- </div> -->
            </li>
        `;
  }

  public render() {
    const { height } = this.state;
    const o = {
      height: `${height - 28 - 28 - 4}px`,
      marginBottom: '4px',
    };

    return hyper.wire(this, ':console')`
      <div style="height: 28px">
        <button onclick=${this.onClear}>Clear</button>
      </div>
      <div class="box" style=${o}>
        <ul class="console">
        ${this.logList.map((message, index) => this.renderLogItem(message, index))}
        </ul>
      </div>
      <div class="box" style="height: 28px; line-height: 1;">
        Output
      </div>
    `;
  }

}

// function aB(): void {
//   const obj = {};
//   Error.captureStackTrace(obj, aB);
//   LoggerMiddleware.original.log(obj);
// }
// aB();

// <!-- <a onclick=${this}
// class="${'nav-link ' + currentValue.toLowerCase()}"
//  data-panel="${currentValue}"> -->
