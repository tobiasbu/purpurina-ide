import hyper from 'hyperhtml';
import { interpolateClassName } from '../../utils';
import { MouseCallback } from '../../types';

function random_id() {
  return `_${(
    Number(String(Math.random()).slice(2)) +
    Date.now() +
    Math.round(performance.now())
  ).toString(36)}`;
}

export interface ButtonOptions {
  icon?: string;
  onClick?: MouseCallback;
}

export default function (text?: string, options?: ButtonOptions) {

  const buttonText = text || 'Button';
  let iconHtml: string;
  if (options && options.icon) {
    iconHtml = `<span class="icon">${options.icon}</span>`;
  }

  return hyper.wire(this, `:${interpolateClassName(text)}-${random_id}`)`
  <button class="btn-outline" onclick=${options && options.onClick} role="button" tabindex="0">
    ${{ html: iconHtml }}
    <span class="name">${buttonText}</span>
  </button>
  `;
}
