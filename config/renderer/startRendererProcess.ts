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
    let childProcess: ChildProcess = null;
    try {
      childProcess = spawn('ts-node', ['config/renderer/rendererServer.ts'], {
        cwd,
        shell: true,
        env: devEnv,
      });
    } catch (e) {
      reject(e);
      return;
    }

    childProcess.on('error', (error) => {
      if (reject === null) {
        logger.error(error);
      } else {
        reject(error);
        reject = null;
      }
    });
    childProcess.on('close', (code, signal) => {
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

    childProcess.stderr!!.on('data', (data: Buffer) => {
      logger.error(data.toString());
    });

    childProcess.stdout.on('data', (data: Buffer) => {
      if (!data.includes('Asset written to')) {
        // filter this message from dev-middleware
        logger.log(stripFNL(data.toString()));
      }
      const res = resolve;
      if (res !== null) {
        if (data.includes('Compiled')) {
          resolve = null;
          res(childProcess);
        }
      }
    });

    // resolve(childProcess);
  });
}
