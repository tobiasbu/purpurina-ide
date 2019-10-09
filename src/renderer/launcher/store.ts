import { createMaestro } from 'maestro';
import { MenuRoute } from './types';

export interface State {
  selected: MenuRoute;
}

const initialState:State = {
  selected: MenuRoute.Projects,
};

const maestro = createMaestro(initialState);

const action = maestro.createAction((producer) => {
  return {
    navigate(route: MenuRoute) {

      if (producer.state.selected === route) {
        return;
      }

      producer.set('selected', route);
    },
  };
});

export {
  action,
};

export default maestro.store;
