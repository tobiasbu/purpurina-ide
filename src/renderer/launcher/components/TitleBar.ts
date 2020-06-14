import hyper from 'hyperhtml';

type Callback = () => void;

const IS_MAC = true;

function WindowsTitleBarButtons(onClose?: Callback, onMinimize?: Callback) {
  return hyper.wire()`
    <div class="win-top-buttons">
      <div class='win-top-button' id='minimize' onclick=${onMinimize}>
        <span>&#x2212;</span>
      </div>
      <div class='win-top-button' id='close' onclick=${onClose}>
        <span>&#x2715;</span>
      </div>
    </div>`;
}

// tslint:disable-next-line: function-name
export default function TitleBar(
  onClose?: Callback,
  onMinimize?: Callback
): HTMLElement {
  const height = IS_MAC ? 22 : 29;

  return hyper.wire()`
      <div class="win-top-bar" style="height: ${height}px">
      ${!IS_MAC ? WindowsTitleBarButtons() : null}
      </div>
    `;
}
