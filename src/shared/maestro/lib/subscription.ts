import { Store, ComponentTypes } from '../types';

function subscribe(store: Store, component?: ComponentTypes) {

  function handleChanges() {

  }

  if (!this.component) {
    store.addListener(handleChanges);
  }

}
