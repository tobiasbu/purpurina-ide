import hyper from 'hyperhtml';

import logo = require('../../img/purpur_icon.svg');
// !svg-inline-loader!../../img/purpur_title.svg'
import logoTitle = require('../../img/purpur_title.svg');

export default function (): HTMLElement {
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
