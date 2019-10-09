import hyper from 'hyperhtml';

const logo = require('!svg-inline-loader!../img/purpur_icon.svg') as string;

const APP_TITLE = 'Purpurina Laucher';

export default function () {
  return hyper.wire(this)`
  <header class="title">
    <div id='logo'>
      ${{ html: logo }}
    </div>
    <h1>${APP_TITLE}</h1>
  </header>`;
}
