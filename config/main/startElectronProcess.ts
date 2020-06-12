import { spawn } from 'child_process';

import { ElectronEnv } from '../types';
import { Logger } from '../devLogger';
import stripFinalNewLine from '../commons/stripFinalNewLine';

export default function startElectronProcess(
  logger: Logger,
  args: string[],
  electronEnv: ElectronEnv
) {
  // eslint-disable-next-line
  const electron = require('electron').toString();
  logger.info('Starting Electron...');

    const electronProcess = spawn(
      `${electron}`,
      args,
      {
        env: electronEnv,
      }
    );

    // For Windows
    require("async-exit-hook")(() => {
      electronProcess.kill("SIGINT")
    })

    let queuedData: string | null = null
    electronProcess.stdout.on('data', (buffer: Buffer) => {

      let data = buffer.toString()
      // do not print the only line - doesn't make sense
      if (data.trim() === "[HMR] Updated modules:") {
        queuedData = data
        return
      }

      if (queuedData != null) {
        data = queuedData + data
        queuedData = null
      }

      logger.log(stripFinalNewLine(data.toString()));
    });

    electronProcess.on('close', (code, signal) => {

      let msg = `Electron Exited with code ${code}`;
      if (signal) {
        msg = msg.concat(` and signal ${JSON.stringify(signal)}`);
      }
      msg = msg.concat('.');
      logger.log(msg);

      if (code === 100) {
        msg = msg.concat("  ")
        setImmediate(() => {
          // logger.log('Restarting Electron process...');
          startElectronProcess(logger, args, electronEnv)
        })
      } else {
        // TODO close HMR server

      }
    });



    // electronProcess.stderr!!.on('data', (data: Buffer) => {
    //   logger.error('ERROR', data.toString());
    // });

    electronProcess.on('error', (err) => {
      logger.error(`Error occurred `, err);
    });

    // process.on('SIGTERM', () => {
    //   logger.log('Stopping dev server');
    //   devMiddleware.close();
    //   rendererServerResult.server.close((err) => {
    //     logger.error(`Server exited with error`, err);
    //     resolve();
    //   })
    // });

    // electronPromise.then((electron) => {
    //   return electron.default;
    // }).then((electron) => {

    // });
}
