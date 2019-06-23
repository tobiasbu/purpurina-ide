import EventEmitter from '../../../engine/events/emitter/EventEmitter';
import PointerManager from './pointer/PointerManager';
import EditorSelectionManager from './EditorSelectionManager';

const Events = new EventEmitter();
const Pointer = new PointerManager(Events);
const Selection = new EditorSelectionManager(Events);

Pointer.startListeners();

export {
    Events,
    Pointer,
    Selection,
};
