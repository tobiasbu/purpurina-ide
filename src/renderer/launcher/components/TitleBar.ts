import hyper from 'hyperhtml';

type Callback = () => void;

// tslint:disable-next-line: function-name
export default function TitleBar(
  onClose?: Callback,
  onMinimize?: Callback
): HTMLElement {
  return hyper.wire()`
        <div class="win-top-bar">
        <div class="win-top-buttons">
          <div class='win-top-button' id='minimize' onclick=${onMinimize}>
          <span>&#x2212;</span>
        </div>
         <div class='win-top-button' id='close' onclick=${onClose}><span>&#x2715;</span></div>
       </div>
      </div>`;
}
