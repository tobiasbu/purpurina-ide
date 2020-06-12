import * as RootIPC from 'node-ipc';
import { ConnectionStatus } from './types';

import type NodeIPC from './node-ipc-types';

type HashGetter = () => string;

/**
 * Hot module replacement (HMR) client.
 * Listen to updates from HMR webpack plugin and trigger to `HmrServer`.
 *
 * Based on https://github.com/electron-userland/electron-webpack/blob/master/packages/electron-webpack/src/electron-main-hmr/HmrClient.ts
 */
export default class HmrClient {
  private currentHashGetter: HashGetter;
  private lastHash: string = null;
  private connectionStatus: ConnectionStatus;
  private hot: __WebpackModuleApi.Hot;
  private ipc: NodeIPC.IPC;

  constructor(hot: __WebpackModuleApi.Hot, currentHashGetter: HashGetter) {
    this.currentHashGetter = currentHashGetter;
    this.hot = hot;
    this.connectionStatus = ConnectionStatus.None;
    this.ipc = new RootIPC.IPC() as NodeIPC.IPC;
  }

  private check() {
    type CheckFN = (autoApply: boolean) => Promise<any>;
    const check = (this.hot.check as unknown) as CheckFN;
    check(true)
    .then((outdatedModules) => {
        if (outdatedModules === null) {
          console.warn(`[HMR] Cannot find update. Need to do a full reload!`);
          return;
        }

        require('webpack/hot/log-apply-result')(
          outdatedModules,
          outdatedModules
        );

        if (this.isUpdated()) {
          console.log(`HMR Client is up to date Up to date.`);
        }
      })
      .catch((error) => {
        const status = this.hot.status();
        if (status === 'abort' || status === 'fail') {
          console.warn(`[HMR] ${error.stack || error.toString()}`);
          console.warn(
            '[HMR] Cannot apply update. Need to do a full reload - application will be restarted'
          );
          require('electron').app.exit(100);
        } else {
          console.warn(`[HMR] Update failed: ${error.stack || error.message}`);
        }
      });
  }

  public isUpdated() {
    return this.lastHash === this.currentHashGetter();
  }

  public connect(socketPath: string, socketId: string): Promise<boolean> {
    if (this.connectionStatus === ConnectionStatus.Connected) {
      return Promise.resolve(true);
    }

    if (this.connectionStatus === ConnectionStatus.Connecting) {
      return Promise.reject(
        new Error('HMR is already trying to connect to Server.')
      );
    }

    if (this.hot === null) {
      throw new Error(
        'Webpack Hot module is null. Client could not connect to HMR Server.'
      );
    }

    const self = this;

    return new Promise((resolve, reject) => {
      const ipc = self.ipc;
      self.connectionStatus = ConnectionStatus.Connecting;

      try {
        ipc.connectTo(socketId, socketPath, () => {
          ipc.of[socketId].on('connect', function (data) {
            ipc.log(data);
            self.connectionStatus = ConnectionStatus.Connected;

            //if data was a string, it would have the color set to the debug style applied to it
          });
          ipc.of[socketId].on('disconnect', function (_data) {
            ipc.log('HMR Client disconnected.');
          });

          ipc.of[socketId].on('compiled', function (hash: string) {
            self.lastHash = hash;
            if (self.isUpdated()) {
              ipc.log(`HMR Client is up to date with '${hash}'`);
              return;
            }
            const hotModuleStatus = self.hot.status();
            if (hotModuleStatus === 'idle') {
              self.check();
            } else if (status === 'abort' || status === 'fail') {
              console.warn(
                `[HMR] Cannot apply update as a previous update ${status}ed. Need to do a full reload!`
              );
            }
          });

          ipc.of[socketId].on('error', function (error) {
            console.error(error.stack ?? JSON.stringify(error, null, 2));
          });
          resolve(true);
        });
      } catch (e) {
        reject(e);
      }
    });
  }
}
