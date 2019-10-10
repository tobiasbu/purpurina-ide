import hyper from 'hyperhtml';
import { interpolateClassName } from '../utils';

function random_id() {
  return `_${(
    Number(String(Math.random()).slice(2)) +
    Date.now() +
    Math.round(performance.now())
  ).toString(36)}`;
}

export default function (text?: string) {

  const buttonText = text || 'Button';

  return hyper.wire(this, `:${interpolateClassName(text)}-${random_id}`)`
  <button>
    <span class="name">${buttonText}</span>
  </button>
  `;
}
