import hyper from 'hyperhtml';
import * as Utils from '@shared/utils';
import { interpolateClassName } from '../../utils';

interface TextInputOptions {
  initialValue?: string;
  maxLength?: number;
  required?: boolean;
  attributes?: string;
  style?: string;
  innerElement?: () => HTMLElement;
  onInput?: (e: Event) => void;
}

function parseOptions(options?: TextInputOptions): TextInputOptions {
  if (!options) {
    return {};
  }

  const get = Utils.objectGet;

  const opts: TextInputOptions = {
    initialValue: get(options, 'initialValue', ''),
    maxLength: get(options, 'maxLength', null),
    attributes: get(options, 'attributes', ''),
    onInput: get(options, 'onInput', null),
    style: get(options, 'style', null),
    innerElement: get(options, 'innerElement'),
    required: get(options, 'required', false),
  };
  return opts;
}

/**
 * Represents TextInput component
 */
export default class TextInput extends hyper.Component {
  private label: string;
  private inputElement: HTMLInputElement;
  private errorElement: HTMLParagraphElement;
  private errorContainer: HTMLDivElement;
  private lastError: string;
  private hasError: boolean;
  readonly options: TextInputOptions;

  get value(): string {
    return this.inputElement.value;
  }

  constructor(label: string, options?: TextInputOptions) {
    super();
    this.label = label;
    this.hasError = false;

    const opts = parseOptions(options);

    const input = hyper.wire()`<input
        id="${interpolateClassName(label)}"
        accept-charset="UTF-8"
        type="text"
        value="${opts.initialValue}"
        maxlength="${opts.maxLength}"
        style="${opts.style}"
        oninput=${opts.onInput}
        />`;

    if (opts.required) {
      input.setAttribute('required', '');
    }

    this.inputElement = input;

    this.errorElement = document.createElement('p');
    this.errorElement.className = 'input-error';
    this.options = opts;

    this.errorContainer = hyper.wire(this)`
    <div class="input-error-container">
      ${this.errorElement}
    </div>
    `;
  }

  setValue(value: string, resetValidation = true): void {
    this.inputElement.value = value;
    if (resetValidation) {
      if (this.hasError) {
        this.errorElement.classList.remove('show');
        this.hasError = false;
      }

      this.inputElement.setCustomValidity('');
    }
  }

  setError(errorValue: string): void {
    const error = Utils.getValue(errorValue, '');
    if (error.length > 0) {
      if (!this.hasError) {
        this.hasError = true;
        this.errorElement.classList.add('show');
      }
      this.lastError = error;
    } else if (this.hasError) {
      this.errorElement.classList.remove('show');
      this.hasError = false;
    }
    this.errorElement.textContent = this.lastError;
    this.inputElement.setCustomValidity(error);
  }

  reset(): void {
    this.inputElement.value = this.options.initialValue;
    this.setError(null);
  }

  render(): HTMLElement {
    const { innerElement } = this.options;
    return this.html`
    <div class="input-text-box">
      <label class="input-label">${this.label}</label>
      <div class="input-box">
        ${this.inputElement}
        ${innerElement ? innerElement() : null}
      </div>
        ${this.errorContainer}
    </div>
    `;
  }
}
