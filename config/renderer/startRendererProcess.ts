import { ChildProcess, spawn } from 'child_process';

import type { Logger } from '../devLogger';
import type { ElectronRendererEnv } from '../types';
import stripFNL from '../commons/stripFinalNewLine';

export default function startRendererProcess(
  cwd: string,
  devEnv: ElectronRendererEnv,
  logger: Logger
) {
  return new Promise<ChildProcess>((resolve, reject) => {
    let rendererProcess: ChildProcess = null;
    try {
      rendererProcess = spawn(
        'ts-node',
        ['config/renderer/rendererServer.ts'],
        {
          cwd,
          shell: true,
          env: devEnv,
        }
      );
    } catch (e) {
      reject(e);
      return;
    }

    rendererProcess.on('error', (error) => {
      if (reject === null) {
        logger.error(error);
      } else {
        reject(error);
        reject = null;
      }
    });

    rendererProcess.on('close', (code, signal) => {
      let msg = `Exited with code ${code}`;
      if (signal) {
        msg = msg.concat(` and signal ${JSON.stringify(signal)}`);
      }
      msg = msg.concat('.');
      logger.log(msg);
    });

    rendererProcess.stderr!!.on('data', (data: Buffer) => {
      logger.error(data.toString());
    });

    rendererProcess.stdout.on('data', (data: Buffer) => {
      if (!data.includes('Asset written to')) {
        // filter this message from dev-middleware
        logger.log(stripFNL(data.toString()));
      }
      const res = resolve;
      if (res !== null) {
        if (data.includes('Compiled')) {
          resolve = null;
          res(rendererProcess);
        }
      }
    });
  });
}
