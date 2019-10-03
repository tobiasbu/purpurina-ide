import hyper from 'hyperhtml';

const APP_TITLE = 'Purpurina Laucher';

function loadLogo() {
  const logo = require('!svg-inline-loader!../img/purpur_icon.svg') as string;
  const svg = document.createElement('template');
  svg.innerHTML = logo.trim();
  return svg.content.firstChild;
}

export default function createHeader(onClose?: () => void, onMinimize?: () => void) {

  return hyper.wire()`

    <header>
      <div class="win-top-bar">
        <div class="win-top-buttons">
          <div class='header-button' id='minimize' onclick=${onMinimize}>
          <span>&#x2212;</span>
        </div>
          <div class='header-button' id='close' onclick=${onClose}><span>&#x2715;</span></div>
        </div>
      </div>
        <div class="title-bar">
          <div id='logo'>
            ${loadLogo()}
          </div>
          <h1>${APP_TITLE}</h1>
        </div>
    </header>`;
}
