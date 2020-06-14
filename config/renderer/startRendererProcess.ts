import { ChildProcess, spawn } from 'child_process';

import { Logger } from '../devLogger';
import { CommonEnv } from '../types';
import stripFNL from '../commons/stripFinalNewLine';

export default function startRendererProcess(
  cwd: string,
  devEnv: CommonEnv,
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

    require('async-exit-hook')((callback: () => void) => {
      const rendererProc = rendererProcess;
      if (rendererProc === null) {
        return;
      }
      rendererProcess = null;

      if (process.platform === 'win32') {
        rendererProc.stdin!!.end(Buffer.from([5, 5]));
      } else {
        rendererProc.kill('SIGINT');
      }
    });

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

      if (code !== 0) {
        logger.error(msg);
        if (reject !== null) {
          reject('Renderer exited with error');
          reject = null;
        }
      } else {
        logger.log(msg);
      }
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
