import { spawn } from 'child_process';

import { Logger } from "../getLogger/types";


export default function startElectronProcess(logger: Logger) {

  // eslint-disable-next-line
  const electron = require("electron");
  logger.info(`[ELECTRON] Starting Electron...`);

  return new Promise((resolve, reject) => {
    const env: NodeJS.ProcessEnv = {
      ...process.env,
      ELECTRON_WEBPACK_WDS_PORT: rendererServerResult.port.toString(10),
      ELECTRON_WEBPACK_WDS_HOST: 'locahost',
      DEVELOPMENT: JSON.stringify(true),
    }

    const electronProcess = spawn(`${electron}`,
      [
        ".", `--inspect=5858`, "--color"
      ],
      {
        env,
        // stdio: ['ignore', 'inherit', 'inherit'],
        stdio: ['ignore', 'inherit', 'inherit'],
      });

    logger.log(`[ELECTRON] Started at ${env.ELECTRON_WEBPACK_WDS_PORT}`);

    electronProcess.on("close", (code) => {
      logger.info(`[ELECTRON] Exited with code: ${code}`);
      devMiddleware.close();
      rendererServerResult.server.close((err) => {
        if (err) {
          logger.error('Server exited with error', err);
        } else {
          logger.log('Server exited successfully');
        }
      })
      resolve();
    })

    electronProcess.on("error", (err) => {
      logger.error(`Electron: Error occurred `, err);
      reject(err)
    })

    process.on('SIGTERM', () => {
      logger.log('Stopping dev server');
      devMiddleware.close();
      rendererServerResult.server.close((err) => {
        logger.error(`Server exited with error`, err);
        resolve();
      })
    });

    // electronPromise.then((electron) => {
    //   return electron.default;
    // }).then((electron) => {


    // });
  });
}
