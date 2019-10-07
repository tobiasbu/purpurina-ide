import { createMaestro } from 'maestro';

export interface State {
  selected: string;
}

const initialState:State = {
  selected: 'home',
};

const maestro = createMaestro(initialState);

const action = maestro.createAction((producer) => {
  return {
    test() {
      producer.reduce({ selected: 'BOM DIA' });
    },
  };
});

export {
  action,
};

export default maestro;
