// import Crocket from 'crocket';
import * as RootIPC from 'node-ipc';
import { Stats } from 'webpack';

import { Logger } from '../devLogger';
import { HmrServer, ConnectionStatus } from './types';

export default function createHmrServer(logger: Logger): HmrServer {
  const ipc = new RootIPC.IPC();

  const appspace = 'electron';
  const id = `main-ipc-${process.pid.toString(16)}`;
  const path = `${ipc.config.socketRoot}${appspace}-${id}.sock`;
  ipc.config.appspace = appspace;
  ipc.config.id = id;
  ipc.config.logger = logger.log.bind(logger, '[IPC]');

  let connectedSockets = [];
  let connectionStatus: ConnectionStatus = ConnectionStatus.None;
  let compiled = false;

  const hmrServer = {
    isListening: function () {
      return connectionStatus === ConnectionStatus.Connected;
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
        const hash = stats.toJson({
          assets: false,
          chunks: false,
          children: false,
          modules: false,
        }).hash;
        for (let i = 0; i < connectedSockets.length; i += 1) {
          ipc.server.emit(connectedSockets[i], 'compiled', hash);
        }
      });
    },
    listen: function () {
      if (this.isListening()) {
        logger.warn('HmrServer is already listening.');
        return Promise.resolve(this);
      }

      if (connectionStatus === ConnectionStatus.Connecting) {
        logger.warn('HmrServer is connecting...');
        return Promise.resolve(this);
      }

      return new Promise((resolve, reject) => {
        try {
          ipc.serve(path, () => {
            ipc.server.on('connect', (socket) => {
              if (connectedSockets.indexOf(socket) === -1) {
                connectedSockets.push(socket);
              }
            });
            ipc.server.on('error', (error: Error) => {
              logger.error('[IPC] Server Error:', error);
            });
            ipc.server.on('socket.disconnect', (socket, destroyedSocketID) => {
              const index = connectedSockets.indexOf(socket);
              if (index !== -1) {
                connectedSockets.splice(index, 1);
              }
              logger.info(
                `[IPC] Socket ${destroyedSocketID} has disconnected!`
              );
            });
            connectionStatus = ConnectionStatus.Connected;
            resolve(this);
          });
          ipc.server.start();
          connectionStatus = ConnectionStatus.Connecting;
        } catch (e) {
          reject(e);
        }
      });
    },
  };

  Object.defineProperty(hmrServer, 'socketPath', {
    value: path,
    writable: false,
  });

  Object.defineProperty(hmrServer, 'socketId', {
    value: id,
    writable: false,
  });

  Object.defineProperty(hmrServer, 'ipc', {
    value: ipc,
    writable: false,
  });

  return hmrServer as HmrServer;
}
