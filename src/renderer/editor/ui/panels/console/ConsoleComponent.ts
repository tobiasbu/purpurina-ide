import hyper from 'hyperhtml';
import WidgetComponent, { ComponentState } from '../../widgets/WidgetComponent';
import { ConsoleMessagePayload, MessageLogType } from '../../../log/types';
// import LoggerMiddleware from '../../../log/LoggerMiddleware';
import { parseMessage } from './parseMessage';

interface ConsoleState extends ComponentState {
  selected: number;
  selectedMsg: ConsoleMessagePayload;
}

export default class ConsoleComponent extends WidgetComponent<ConsoleState> {

  private logElements: HTMLElement[];
  private logList: ConsoleMessagePayload[];

  constructor(props: any) {
    super(props);
    this.logList = [];
    this.logElements = [];
  }

  public onLog(payload: ConsoleMessagePayload) {
    this.logList.push(payload);
    if (!payload.parent && payload.type !== MessageLogType.GroupEnd) {
      const el = hyper.wire()`
        <div class="console-icon">
            <i class="icon">&#x24D8;</i>
        </div>
        <div class="console-message">
          <span class="str">${parseMessage(payload)}</span>
        </div>
      `;

      this.logElements.push(el);
      this.render();
    }
  }

  // private onClear = () => {
  //   this.logList.length = 0;
  //   this.logElements.length = 0;
  //   console.clear();
  //   // this.render();
  //   this.setState({
  //     selected: -1,
  //   });
  // }

  private onSelectLog = (index:number, e: MouseEvent) => {
    if (this.state.selected === index) {
      return;
    }
    e.stopPropagation();
    this.setState({
      selected: index,
    });
  }

  private renderLogItem(msgPayload: any, index: number) {

    // const logType = (msgPayload.type === MessageLogType.Info) ?
    //   'LOG' : (msgPayload.type === MessageLogType.Warn) ? 'WARN' : 'ERROR';

    // const output = msgPayload.message;
    // const type = typeof (output);
    // if (type === 'string') {
    //   // output = (output as string).replace(/(?:\r\n|\r|\n)/g, '<br>');
    // }

    const id = `:csl-${index}`;
    const isSelected =  index === this.state.selected;
    return hyper.wire(this, id)`
            <li onmousedown=${(e: MouseEvent) => this.onSelectLog(index, e)} data-cls=${index} class="${(isSelected ? 'selected' : '')}">
              ${msgPayload}
            </li>
        `;
  }

  public render() {
    // const { height } = this.state;
    // const o = {
    //   height: `${height - 28 - 28 - 4}px`,
    //   marginBottom: '4px',
    // };
  //   <!-- <div style="height: 28px">
  //   <button onclick=${this.onClear}>Clear</button>
  // </div> -->

    return this.html`

        <div class="console-wrapper">
          <div class="box" style=${{ height: '75%', width: '100%' }}>
            <!-- <div class="box-padding"> -->
              <ul class="console">
              ${this.logElements.map((message, index) => this.renderLogItem(message, index)) }
              </ul>
            <!-- </div> -->
          </div>
          <div class="box-handle" style=${{ height: '2px' }} />
          <div class="box" style="height: 25%; padding: 4px">
            Output
          </div>
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
