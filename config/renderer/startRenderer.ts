import { ChildProcess, spawn } from 'child_process';
import devLogger, { Logger } from '../devLogger';

import { DevelopmentEnvironment } from '../types';

export default function startRenderer(env: DevelopmentEnvironment, logger: Logger) {
  return new Promise<ChildProcess>((resolve, reject) => {
    let childProcess: ChildProcess = null;
    try {
      childProcess = spawn('ts-node', ['config/renderer/rendererServer.ts'],
        {
          cwd: env.cwd,
          shell: true,
          env: {
            ...process.env,
            NODE_ENV: env.NODE_ENV,
            PURPURINA_DEV_PORT: env.renderer.port.toString(10),
            PURPURINA_DEV_HOST: env.renderer.host,
            PURPURINA_DEV_DIST_PATH: env.distPath,
            PURPURINA_DEV_PROJECT_PATH: env.projectPath,
          }
        });
      // rendererProcess.unref();
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
      let msg = `Closed with code ${code}`;
      if (signal) {
        msg = msg.concat(` and with signal ${JSON.stringify(signal)}.`)
      }
      msg = msg.concat('.');

      if (code !== 0) {
        logger.error(msg);
      } else {
        logger.log(msg);
      }
    });


    childProcess.stderr.on('data', (data) => {
      logger.error(data);
    });

    childProcess.stdout.on('data', (data: string) => {
      if (!data.includes('Asset written to')) { // filter this message from dev-middleware
        logger.log(data);
      }
      const res = resolve
      if (res !== null) {
        if (data.includes('Compiled')) {
          resolve = null;
          res(childProcess);
        }
      }
    })

    resolve(childProcess);
  })
}
