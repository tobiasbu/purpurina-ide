import * as express from 'express';

import * as webpack from 'webpack';
import * as WebpackDevMiddleware from 'webpack-dev-middleware';
import * as WebpackHotMiddleware from 'webpack-hot-middleware';

import webpackStats from '../stats';

import { WebpackDevMiddlewareMoreOptions, RendererServer } from '../types';
import webpackConfig from './webpack.config.renderer';

async function serve() {


  const DIST_PATH = process.env.PURPURINA_DEV_DIST_PATH; // path.join(__dirname, '../dist');
  const PORT = (process.env.PURPURINA_DEV_PORT) ? parseInt(process.env.PURPURINA_DEV_PORT) : 3000;

  // const logger = getLogger(
  //   {
  //     name: 'purpur [RENDERER]',
  //     timestamp: true,
  //     symbol: ' \u2615',
  //     errorSymbol: ' \u2620'
  //   });

  const logger = {
    log: console.log,
    info: console.info,
    error: console.error,
    warn: console.warn,
    verbose: console.error,
    debug: console.debug,
  }


  const config = webpackConfig({
    host: process.env.PURPURINA_DEV_HOST,
    port: PORT,
    isProduction: process.env.NODE_ENV === 'development',
    distPath: DIST_PATH,
    projectPath: process.env.PURPURINA_DEV_PROJECT_PATH,
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
  const devMiddleware = WebpackDevMiddleware(compiler, devOptions);
  const hotMiddleware = WebpackHotMiddleware(compiler, {
    // path: '/__webpack_hmr',
    log: logger.log,
    heartbeat: 10 * 1000,
    reload: true,
  });

  // Renderer Server configuration
  const expressApp = express();
  expressApp.use(devMiddleware);
  expressApp.use(hotMiddleware);
  expressApp.use(express.static(DIST_PATH));

  // Renderer promise
  return new Promise<RendererServer>((resolve, reject) => {
    const server = expressApp.listen(PORT, 'localhost', (error) => {
      if (error) {
        reject(error);
      }
      logger.info('Dev server listening on port ' + PORT + '.');
      // process.send('serverOnline')
      resolve({ server, devMiddleware });
      // resolve({ server, devMiddleware, port: PORT });
    })
  });
}

serve();
