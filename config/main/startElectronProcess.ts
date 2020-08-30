import { spawn } from 'child_process';

import type { ElectronMainEnv } from '../types';
import type { Logger } from '../devLogger';
import stripFinalNewLine from '../commons/stripFinalNewLine';

export default function startElectronProcess(
  logger: Logger,
  args: string[],
  electronEnv: ElectronMainEnv
) {
  let queuedData: string | null = null;

  const electron = require('electron').toString();
  logger.info('Starting Electron...');

  const electronProcess = spawn(`${electron}`, args, {
    env: electronEnv,
  });

  // For Windows
  require('async-exit-hook')(() => {
    electronProcess.kill('SIGINT');
  });

  electronProcess.stdout.on('data', (buffer: Buffer) => {
    let data = buffer.toString();
    // do not print the only line - doesn't make sense
    if (data.trim() === '[HMR] Updated modules:') {
      queuedData = data;
      return;
    }

    if (queuedData != null) {
      data = queuedData + data;
      queuedData = null;
    }

    logger.log(stripFinalNewLine(data.toString()));
  });

  electronProcess.on('close', (code, signal) => {
    let msg = `Electron exited with code ${code}`;
    if (signal) {
      msg = msg.concat(` and signal ${JSON.stringify(signal)}`);
    }
    msg = msg.concat('.');
    logger.log(msg);

    if (code === 100) {
      msg = msg.concat('  ');
      setImmediate(() => {
        startElectronProcess(logger, args, electronEnv);
      });
    } else {
      (process.emit as any)('message', 'shutdown');
    }
  });

  electronProcess.stderr!!.on('data', (data: Buffer) => {
    logger.error(data.toString());
  });

  electronProcess.on('error', (err) => {
    logger.error(`Error occurred `, err);
  });

  function restart() {
    electronProcess.emit('close', 100);
  }

  return {
    restart,
  };
}
