import MouseSystem from '../MouseSystem';

function getMouseWheelEvent(): string {
  let prefix = '';

  if (window.addEventListener) {
    //_addEventListener = "addEventListener";
  } else {
    //_addEventListener = "attachEvent";
    prefix = 'on';
  }

  const support =
    'onwheel' in document.createElement('div')
      ? 'wheel' // Modern browsers support "wheel"
      : document.onmousewheel !== undefined
      ? 'mousewheel' // Webkit and IE support at least "mousewheel"
      : 'DOMMouseScroll'; // let's assume that remaining browsers are older Firefox

  return prefix + support;
}

/**
 *
 * @param {MouseSystem} mouse
 * @param {HTMLElement} target
 */
export default function startMouseListener(
  this: MouseSystem,
  target: HTMLElement
) {
  // mouse event handler

  let eventQueue = this.eventQueue;
  const self = this;

  const config = {
    passive: false,
  };

  const handler = function (event: MouseEvent) {
    if (event.defaultPrevented) {
      return;
    }

    if (self.preventDefault) {
      event.preventDefault();
    }

    eventQueue.push(event);
  };

  target.addEventListener('mousedown', handler, config);
  target.addEventListener('mousemove', handler, config);
  target.addEventListener('mouseup', handler, config);
  target.addEventListener('mouseenter', handler, config);
  target.addEventListener('mouseleave', handler, config);
  this.wheelEventName = getMouseWheelEvent();
  target.addEventListener(this.wheelEventName, handler, config);

  return handler;
}
