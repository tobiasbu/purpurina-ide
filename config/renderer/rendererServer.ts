import express from 'express';
import type { Server } from 'http';
import type { NextHandleFunction } from 'connect';

import webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';

import type {
  WebpackDevMiddlewareMoreOptions,
  EnvironmentConfig,
} from '../types';
import type { LogFunction } from '../devLogger';
import webpackStats from '../commons/webpackStats';

import rendererWebpackConfig from './webpack.config.renderer';

type DevMiddleware = WebpackDevMiddleware.WebpackDevMiddleware &
  NextHandleFunction;

interface SimpleLogger {
  log: LogFunction;
  info: LogFunction;
  error: LogFunction;
  warn: LogFunction;
  verbose: LogFunction;
  debug: LogFunction;
}

interface RendererServerProcess {
  logger: SimpleLogger;
  server: Server;
  devMiddleware: DevMiddleware;
}

function serve(): Promise<RendererServerProcess> {
  const devEnv = process.env as EnvironmentConfig;

  const {
    ELECTRON_WEBPACK_WDS_HOST,
    ELECTRON_WEBPACK_WDS_PORT,
    PURPUR_PROJECT_PATH,
    PURPUR_DIST_PATH,
    NODE_ENV,
  } = devEnv;

  const PORT = ELECTRON_WEBPACK_WDS_PORT
    ? parseInt(ELECTRON_WEBPACK_WDS_PORT)
    : 3000;

  // const logger = purpurLogger(({
  //   name: 'renderer-server',
  //   symbol: '',
  //   errorSymbol: '',
  //   color: 'green',
  // }))

  const logger = {
    log: console.log,
    info: console.info,
    error: console.error,
    warn: console.warn,
    verbose: console.error,
    debug: console.debug,
  };

  const config = rendererWebpackConfig({
    PURPUR_PROJECT_PATH,
    PURPUR_DIST_PATH,
    NODE_ENV,
    ELECTRON_WEBPACK_WDS_HOST,
    ELECTRON_WEBPACK_WDS_PORT,
  });

  logger.info('Compiling renderer...');
  const compiler = webpack(config);

  const devOptions: WebpackDevMiddlewareMoreOptions = {
    logger: logger as any,
    stats: webpackStats,
    publicPath: config.output.publicPath,
    quiet: false,
    reload: true,
    overlay: true,
    writeToDisk: true,
    noInfo: true,
    logLevel: 'warn',
  };
  const hotMiddleware = WebpackHotMiddleware(compiler, {
    // path: '/__webpack_hmr',
    log: logger.log,
    heartbeat: 10 * 1000,
  });
  const devMiddleware = WebpackDevMiddleware(compiler, devOptions);

  // Renderer Server configuration
  const expressApp = express();
  expressApp.use(devMiddleware);
  expressApp.use(hotMiddleware);
  expressApp.use(express.static(PURPUR_DIST_PATH));

  // Renderer promise
  return new Promise<RendererServerProcess>((resolve, reject) => {
    const server = expressApp.listen(
      PORT,
      devEnv.ELECTRON_WEBPACK_WDS_HOST,
      (error) => {
        if (error) {
          reject(error);
          return;
        }
        logger.info('Dev server listening on port ' + PORT + '.');
        resolve({ server, devMiddleware, logger });
      }
    );
  });
}

serve().then((rendererServe) => {
  const logger = rendererServe.logger;
  let serverClosed = false;

  function closeServer(callback?: () => void) {
    if (!serverClosed) {
      rendererServe.devMiddleware.close(() => {
        logger.log('Dev middleware closing');
      });
      rendererServe.server.close((error) => {
        if (error) {
          logger.error('Dev server exited with error:', error);
        } else {
          logger.log('Dev server exited successfully');
        }
      });
      if (callback) {
        callback();
      }
      serverClosed = true;
    }
  }

  process.on('SIGTERM', () => {
    logger.log('Stopping dev server');
    closeServer();
  });
});
