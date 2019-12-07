// import Crocket from 'crocket';
import * as RootIPC from 'node-ipc';
import { Logger } from '../devLogger';

export default function startHmrServer(logger: Logger) {

  const ipc = new RootIPC.IPC();

  const appspace = 'electron';
  const id = `main-ipc-${process.pid.toString(16)}`;
  const path = `${ipc.config.socketRoot}${appspace}-${id}.sock`;
  ipc.config.appspace = appspace;
  ipc.config.id = id;
  ipc.config.logger = logger.log.bind(logger, '[IPC]');
  return new Promise((resolve, reject) => {
    try {
      ipc.serve(path, () => {
        ipc.server.on('connect', (data, socket) => {
          logger.info(`[IPC] socket connected`, data, socket);
        });
        ipc.server.on('error', (error: Error) => {
          logger.info('[IPC] Server Error:', error);
        });
        resolve(
          {
            path: `${ipc.config.socketRoot}${appspace}${id}`,
            ipc,
          });
      })
      ipc.server.start();

    } catch (e) {
      reject(e);
    }
  });

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
