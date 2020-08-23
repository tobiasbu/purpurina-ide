import * as path from 'path';

import { CommonEnv } from './types';
import createHmrServer from './electron-hmr/createHmrServer';
import startRendererProcess from './renderer/startRendererProcess';

import purpurLogger from './devLogger/purpurLogger';
import startElectronProcess from './main/startElectronProcess';
import compileMain from './main/compileMain';
import compilePreload from './preload/compilePreload';
const getPort = require('get-port');

async function main() {
  const logger = purpurLogger({
    name: 'purpurina',
    symbol: '\u26A1',
    errorSymbol: '\u2620',
    color: 'magenta',
  });

  logger.log('Starting development environment');

  process.on('unhandledRejection', (e: Error) => {
    if (e) {
      logger.error(`Uncaught exception `, e.stack ?? e);
    }
    process.exit(1);
  });

  process.on('uncaughtException', (e: Error) => {
    if (e) {
      logger.error(`Uncaught exception `, e.stack ?? e);
    }
    process.exit(1);
  });

  const devEnv: CommonEnv = {
    ...process.env,
    TS_NODE_PROJECT: path.join(__dirname, './tsconfig.dev.json'),
    NODE_ENV: 'development',
    PURPUR_DIST_PATH: path.join(__dirname, '../out/dev'),
    PURPUR_PROJECT_PATH: path.join(__dirname, '../'),
    ELECTRON_WEBPACK_WDS_HOST: 'localhost',
    ELECTRON_WEBPACK_WDS_PORT: (
      await getPort({ port: getPort.makeRange(3000, 4000), host: '127.0.0.1' })
    ).toString(10),
  };

  const hmrServer = createHmrServer(logger);

  const results = await Promise.all([
    hmrServer.listen(),
    startRendererProcess(
      process.cwd(),
      devEnv,
      purpurLogger({
        name: 'renderer',
        color: 'green',
        symbol: '\u2606',
        errorSymbol: '\u2623',
      })
    ),
    compilePreload(
      devEnv,
      purpurLogger({
        name: 'preload',
        color: 'yellow',
        symbol: '\u2606',
        errorSymbol: '\u2623',
      })
    ),
    compileMain(
      devEnv,
      hmrServer,
      purpurLogger({
        name: 'main',
        color: 'yellow',
        symbol: '\u2606',
        errorSymbol: '\u2623',
      })
    ),
  ]);

  const electronMainFile = path.join(devEnv.PURPUR_DIST_PATH, './main/main.js');
  const electronArgs = [
    electronMainFile,
    '--color',
    `--inspect=${await getPort({ port: 5858 })}`,
  ];

  startElectronProcess(
    purpurLogger({
      name: 'electron',
      color: 'blueBright',
      symbol: '\u2606',
      errorSymbol: '\u2623',
    }),
    electronArgs,
    {
      ...devEnv,
      ELECTRON_HMR_SOCKET_PATH: hmrServer.socketPath,
      ELECTRON_HMR_SOCKET_ID: hmrServer.socketId,
    }
  );

  const exitHook = require('async-exit-hook');

  exitHook((callback: () => void) => {
    const [ipcServer, rendererProc, preloadCompiler, mainCompiler] = results;

    if (rendererProc === null) {
      return;
    }
    mainCompiler.close();
    ipcServer.close();
    results[1] = null;
    if (process.platform === 'win32') {
      // rendererProc.stdin!!.end(Buffer.from([5, 5]));
      rendererProc.kill('SIGTERM');
    } else {
      rendererProc.kill('SIGINT');
    }
    if (callback) {
      callback();
    }
  });

  exitHook.uncaughtExceptionHandler((err) => {
    logger.error(err);
  });

  // You can hook unhandled rejections with unhandledRejectionHandler()
  exitHook.unhandledRejectionHandler((err) => {
    logger.error(err);
  });
}

main();
