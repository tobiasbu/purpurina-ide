import hyper from 'hyperhtml';
import { interpolateClassName } from '../utils';

function random_id() {
  return `_${(
    Number(String(Math.random()).slice(2)) +
    Date.now() +
    Math.round(performance.now())
  ).toString(36)}`;
}

export default function (text?: string, icon?: string) {

  const buttonText = text || 'Button';
  let iconHtml: string;
  if (icon) {
    iconHtml = `<span class="icon">${icon}</span>`;
  }

  return hyper.wire(this, `:${interpolateClassName(text)}-${random_id}`)`
  <button>
    ${{ html: iconHtml }}
    <span class="name">${buttonText}</span>
  </button>
  `;
}
