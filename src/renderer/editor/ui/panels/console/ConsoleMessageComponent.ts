import { ConsoleMessagePayload } from '../../../log/types';
import hyper from 'hyperhtml';
import { parseMessage } from './parseMessage';

// function ConsoleMessage(message: ConsoleMessagePayload) {
//   const payload = message;
//   const el = hyper.wire(this, ':csl-#{message.id}')`
//         <div class="console-icon">
//             <i class="icon">&#x24D8;</i>
//         </div>
//         <div class="console-message">
//           <span class="str">${parseMessage(payload)}</span>
//         </div>
//       `;

//   this.render = function () {
//     return el;
//   };
// }

export default class ConsoleMessageComponent extends hyper.Component {
  private payload: ConsoleMessagePayload;

  constructor(payload: ConsoleMessagePayload) {
    super();
    this.payload = payload;
    this.html = hyper.wire(this);
  }

  private onSelect = () => {
    //     private onSelectLog = (e: MouseEvent) => {
    //   LoggerMiddleware.original.log(e);
    //   // (e.target as HTMLElement).style.background = '#fff';
    // }
    // private renderLogItem(msgPayload: ConsoleMessagePayload, index: number) {
    //   // const logType = (msgPayload.type === MessageLogType.Info) ?
    //   //   'LOG' : (msgPayload.type === MessageLogType.Warn) ? 'WARN' : 'ERROR';
    //   LoggerMiddleware.original.log(msgPayload);
    //   // const output = msgPayload.message;
    //   // const type = typeof (output);
    //   // if (type === 'string') {
    //   //   // output = (output as string).replace(/(?:\r\n|\r|\n)/g, '<br>');
    //   // }
    //   return hyper.wire(this, `:console-item-${index}`)`
    //           <li onclick=${this.onSelectLog}>
    //               <div class="console-icon">
    //                 <i class="icon">&#x24D8;</i>
    //               </div>
    //             <div class="console-message">
    //               <span class="str">${parseMessage(msgPayload)} | ${msgPayload.st}</span>
    //             </div>
    //           </li>
    //       `;
    // }
  };

  public render() {
    // `:console-item-${index}`
    return this.html`
    <li onclick=${this.onSelect}>
        <div class="console-icon">
          <i class="icon">&#x24D8;</i>
        </div>
      <div class="console-message">
        <span class="str">${parseMessage(this.payload)}</span>
      </div>
    </li>
  `;
  }
}
