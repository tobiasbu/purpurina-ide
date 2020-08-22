import { ipcMain } from 'electron';
import { ChannelApi } from './types';

interface ChannelApiMap {
  [indexer: string]: ChannelApi;
}

export default class IpcContext implements IDisposable {
  private apisMap: ChannelApiMap;

  constructor() {
    this.apisMap = {};
  }

  createApi(apiName: string, api: ChannelApi) {
    const channelNames = Object.keys(api);

    for (let i = 0; i < channelNames.length; i += 1) {
      const name = channelNames[i];
      const listenerName = `@${apiName}/${name}`;
      const apiDef = api[name];

      if (typeof apiDef === 'object') {
        let fnName = apiDef.handle ? 'handle' : 'on';
        if (apiDef.once) {
          fnName = fnName.concat(apiDef.handle ? 'Once' : 'ce');
        }
        ipcMain[fnName](listenerName, apiDef.fn);
      } else {
        ipcMain.addListener(listenerName, apiDef);
      }
    }
    this.apisMap[apiName] = api;
    return this;
  }

  clearApi(apiName: string) {
    const api = this.apisMap[apiName];

    if (!api) {
      return this;
    }

    for (const name in api) {
      const listenerName = `@${apiName}/${name}`;
      ipcMain.removeAllListeners(listenerName);
    }

    this.apisMap[apiName] = undefined;

    return this;
  }

  dispose() {}
}
