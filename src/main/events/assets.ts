import * as ipc from './ipc';

export default function init() {
  ipc.on('@assets/import', (event, asset) => {
    console.log(asset);
  });
}
