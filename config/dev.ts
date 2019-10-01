
import * as express from 'express';
import * as webpack from 'webpack';
import * as path from 'path';

import * as WebpackDevMiddleware from 'webpack-dev-middleware';
import * as WebpackHotMiddleware from 'webpack-hot-middleware';

import webpackConfigFn from './webpack.config';
import { WebpackDevMiddlewareMoreOptions } from './types';

  // import { spawn } from 'child_process';


// https://github.com/webpack/webpack/pull/9436
// const logging = require('webpack/lib/logging/runtime');

// const logger = logging.getLogger('purpurina');
// logging.configureDefaultLogger(
//   { 
//     level: 'log',
//     colors: true
// });


// const getLogger = require('webpack-log');
import getLogger from './getLogger';
const logger = getLogger(
  { 
    name: 'purpurina', 
    timestamp: true,
    symbol: ' \u2605',
    errorSymbol: ' \u26A0'
  });

logger.log('Preparing development environment');

async function main() {

  process.on("unhandledRejection", (e: Error) => {
    logger.error(`Unhandled rejection `, e.stack || e);
    process.exit(1);
  });

  process.on("uncaughtException", (e: Error) => {
    logger.error(`Uncaught exception `, e.stack || e);
    process.exit(1);
  });

  // Create webpack config for electron processes
  const config = webpackConfigFn({
    MODE: "development",
    isProduction: false,
  });

  // Main webpack compilation
  const mainPromise = new Promise<webpack.Stats>((resolve, reject) => {
    logger.info('Compiling main...', );
    webpack(config.main, (err, stats) => {
      if (err) {
        reject(err);
      } else {
        resolve(stats);
      }
    });
  });


  const PORT = 3000;
  const PATH = path.join(__dirname, '../dist');

  logger.info('Compiling renderer...');
  const rendererCompiler = webpack(config.renderer);

  const devOptions: WebpackDevMiddlewareMoreOptions = {
    publicPath: config.renderer.output.publicPath,
    quiet: false,
    reload: true,
    overlay: true,
    writeToDisk: true,

  };
  const devMiddleware = WebpackDevMiddleware(rendererCompiler, devOptions);
  const hotMiddleware = WebpackHotMiddleware(rendererCompiler);

  // Renderer Server configuring
  const expressApp = express();
  expressApp.use(devMiddleware);
  expressApp.use(hotMiddleware);
  expressApp.use(express.static(PATH));

  // Renderer promise
  new Promise((resolve, reject) => {
    expressApp.listen(PORT, 'localhost', (error) => {
      if (error) {
        reject(error);
      }
      logger.log('Renderer dev server listening on port ' + PORT + '\n');
      resolve(PORT);
    })
  });

  logger.info('Building main...');
  const stats = await mainPromise;
  {
    const info = stats.toJson();
    if (stats.hasErrors()) {
      logger.error("Main error:\n", info.errors.join("\n\n"));
      process.exit(1);
    }
    if (stats.hasWarnings()) {
      logger.warn("Main warnings:\n:", info.warnings.join("\n\n"));
    }
    logger.info(`Main has been built successfully!`);
  }

}

main();

// spawn('npm', ['run', 'start-electron'], {
//   shell: true,
//   env: process.env,
//   stdio: 'inherit'
// })
//   .on('close', code => process.exit(code))
//   .on('error', spawnError => console.error(spawnError));


// process.on('SIGTERM', () => {
//   console.log('Stopping dev server');
//   devMiddleware.close();
//   server.close(() => {
//     process.exit(0);
//   });
// });