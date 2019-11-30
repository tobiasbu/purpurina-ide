import hyper from 'hyperhtml';
import { interpolateClassName } from '../../utils';
import { MouseCallback } from '../../types';
import { objectGet } from '@shared/utils';

function randomId(): string {
  return `_${(
    Number(String(Math.random()).slice(2)) +
    Date.now() +
    Math.round(performance.now())
  ).toString(36)}`;
}

export interface ButtonOptions {
  icon?: string;
  onClick?: MouseCallback;
  type?: 'button' | 'submit';
}

export default function (text?: string, options?: ButtonOptions): HTMLElement {
  const buttonText = text || 'Button';
  let iconHtml: string;
  if (options && options.icon) {
    iconHtml = `<span class="icon">${options.icon}</span>`;
  }

  return hyper.wire(this, `:${interpolateClassName(text)}-${randomId}`)`
  <button class="btn-outline"
  onclick=${options && options.onClick}
  role="button"
  type=${objectGet(options, 'type', 'button')}
  tabindex="0">
    ${{ html: iconHtml }}
    <span class="name">${buttonText}</span>
  </button>
  `;
}
