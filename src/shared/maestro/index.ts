import createMaestro from './createMaestro';
import fregues from './fregues';

import Component from './components/Component';

export type RenderFunction = (...args: any[]) => HTMLElement | string | number | boolean;

export default {
  createMaestro,
  fregues,
  Component,
};

export {
  createMaestro,
};
