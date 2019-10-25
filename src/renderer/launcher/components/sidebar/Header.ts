import hyper from 'hyperhtml';

const logo = require('!svg-inline-loader!../../img/purpur_icon.svg') as string;
const logoTitle = require('!svg-inline-loader!../../img/purpur_title.svg') as string;

const APP_TITLE = 'Purpurina';

export default function () {
      // <h1>${APP_TITLE}</h1>
  return hyper.wire(this)`
  <header class="title">
    <div id='logo'>
      ${{ html: logo }}
    </div>
    <div id='logo-title'>
    ${{ html: logoTitle }}
    </div>
  </header>`;
}
