// import Crocket from 'crocket';
import * as RootIPC from 'node-ipc';
import { Stats } from 'webpack';

import { Logger } from '../../devLogger';

export interface HmrServer {
  readonly socketPath: string;
  onBeforeCompile(): void;
  onCompiled(stats: Stats): void;
  isListening(): boolean;
  listen(): Promise<HmrServer>;
}


export default function createHmrServer(logger: Logger): HmrServer {

  const ipc = new RootIPC.IPC();

  const appspace = 'electron';
  const id = `main-ipc-${process.pid.toString(16)}`;
  const path = `${ipc.config.socketRoot}${appspace}-${id}.sock`;
  ipc.config.appspace = appspace;
  ipc.config.id = id;
  ipc.config.logger = logger.log.bind(logger, '[IPC]');

  let isListening = false;
  let compiled = false;

  const hmrServer = {
    isListening: function () {
      return isListening;
    },
    onBeforeCompile: function () {
      compiled = false;
    },
    onCompiled: function (stats: Stats) {
      compiled = true;
      setImmediate(() => {
        if (!compiled) {
          return;
        }
        const hash = stats.toJson({ assets: false, chunks: false, children: false, modules: false }).hash;
        ipc.server.emit('compiled', hash);
      });
    },
    listen: function () {
      if (isListening) {
        logger.warn('HmrServer is already listening.');
        return Promise.resolve(this);
      }

      return new Promise((resolve, reject) => {
        try {
          ipc.serve(path, () => {
            ipc.server.on('connect', (data, socket) => {
              logger.info(`[IPC] Socket connected`, data, socket);
            });
            ipc.server.on('error', (error: Error) => {
              logger.error('[IPC] Server Error:', error);
            });
            isListening = true;
            resolve(this);
          });
          ipc.server.start();

        } catch (e) {
          reject(e);
        }
      });
    }
  };

  Object.defineProperty(hmrServer, "socketPath", {
    value: path,
    writable: false
  });

  Object.defineProperty(ipc, "ipc", {
    value: ipc,
    writable: false
  });

  return hmrServer as HmrServer;
  // const ipc = new Crocket();
  // const socketRoot = `/tmp/electron-main-ipc-${process.pid.toString(16)}.sock`;
  // return new Promise<string>((resolve, reject) => {
  //   ipc.listen({ path: socketRoot }, (error) => {
  //     if (error != null) {
  //       reject(error);
  //     }
  //     resolve(socketRoot);
  //   })
  // });
}
