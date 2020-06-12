import express from 'express';

import webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';

import {
  WebpackDevMiddlewareMoreOptions,
  RendererServer,
  CommonEnv,
} from '../types';
import webpackStats from '../commons/webpackStats';

import rendererWebpackConfig from './webpack.config.renderer';

async function serve() {
  const devEnv = process.env as CommonEnv;

  const DIST_PATH = devEnv.PURPUR_DIST_PATH;
  const PORT = devEnv.ELECTRON_WEBPACK_WDS_PORT
    ? parseInt(devEnv.ELECTRON_WEBPACK_WDS_PORT)
    : 3000;

  const logger = {
    log: console.log,
    info: console.info,
    error: console.error,
    warn: console.warn,
    verbose: console.error,
    debug: console.debug,
  };

  const config = rendererWebpackConfig({
    NODE_ENV: devEnv.NODE_ENV,
    HOST: devEnv.ELECTRON_WEBPACK_WDS_HOST,
    PORT: PORT,
    DIST_PATH: DIST_PATH,
  });

  logger.info('Compiling renderer...');
  const compiler = webpack(config);

  // const rendererCompiler = new Promise((resolve, reject) => {
  //   logger.info('Compiling renderer...');
  //   const compiler = webpack(config, (err, stats) => {
  //     if (err) {
  //       reject(err);
  //     } else {
  //       resolve({ stats, compiler });
  //     }
  //   });
  // }).then(({ stats, compiler }) => {

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
  expressApp.use(express.static(DIST_PATH));

  // Renderer promise
  return new Promise<RendererServer>((resolve, reject) => {
    const server = expressApp.listen(
      PORT,
      devEnv.ELECTRON_WEBPACK_WDS_HOST,
      (error) => {
        if (error) {
          reject(error);
          return;
        }
        logger.info('Dev server listening on port ' + PORT + '.');
        resolve({ server, devMiddleware });
      }
    );
  });
}

serve();
