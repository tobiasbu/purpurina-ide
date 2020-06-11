import * as RootIPC from 'node-ipc';
import { ConnectionStatus } from './types';

import type NodeIPC from './node-ipc-types';

/**
 * Hot module replacement (HMR) client.
 * Listen to updates from HMR webpack plugin and trigger to `HmrServer`.
 *
 * Based on https://github.com/electron-userland/electron-webpack/blob/master/packages/electron-webpack/src/electron-main-hmr/HmrClient.ts
 */
export default class HmrClient {

  private lastHash: string = null;
  private connectionStatus: ConnectionStatus;
  private hot: __WebpackModuleApi.Hot;
  private ipc: NodeIPC.IPC;


  constructor(hot: __WebpackModuleApi.Hot) {
    this.hot = hot;
    this.connectionStatus = ConnectionStatus.None;
    this.ipc = new RootIPC.IPC() as NodeIPC.IPC;
  }

  public connect(socketPath: string, socketId: string): Promise<boolean> {
    if (this.connectionStatus === ConnectionStatus.Connected) {
      return Promise.resolve(true);
    }

    if (this.connectionStatus === ConnectionStatus.Connecting) {
      return Promise.reject(new Error("HMR is already trying to connect to Server."));
    }

    if (this.hot! === null) {
      throw new Error('Webpack Hot module is null. Client could not connect to HMR Server.');
    }

    const self = this;

    return new Promise((resolve, reject) => {

      const ipc = self.ipc;
      self.connectionStatus = ConnectionStatus.Connecting;

      ipc.connectTo(socketPath, socketId, () => {

        ipc.of[socketId].on(
          'connect',
          function (data) {
            ipc.log(data);
            self.connectionStatus = ConnectionStatus.Connected;

            //if data was a string, it would have the color set to the debug style applied to it
          }
        );

        ipc.of[socketId].on(
          'disconnect',
          function (_data) {
            ipc.log('HMR Client disconnected.')
          }
        );

        ipc.of[socketId].on(
          'error',
          function (error) {
            console.error(error.stack ?? JSON.stringify(error, null, 2));
          }
        );
        resolve(true)
      });

    });
  }

};
