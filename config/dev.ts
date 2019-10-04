
import * as express from 'express';
import * as webpack from 'webpack';
import * as path from 'path';

import * as WebpackDevMiddleware from 'webpack-dev-middleware';
import * as WebpackHotMiddleware from 'webpack-hot-middleware';

import webpackConfigFn from './webpack.config';
import { WebpackDevMiddlewareMoreOptions, RendererServer } from './types';
import { spawn } from 'child_process';


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
    name: 'purpur-dev-server',
    timestamp: true,
    symbol: ' \u2615',
    errorSymbol: ' \u2620'
  });

logger.log('Preparing development environment');

async function main() {

  const DIST_PATH = path.join(__dirname, '../dist');

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
    mode: "development",
    isProduction: false,
  });

  // Main webpack compilation
  const mainPromise = new Promise<webpack.Stats>((resolve, reject) => {
    logger.info('Compiling main...');
    webpack(config.main, (err, stats) => {
      if (err) {
        reject(err);
      } else {
        resolve(stats);
      }
    });
  });


  logger.info('Compiling renderer...');
  logger.log(`Middleware public path: ${config.renderer.output.publicPath}`)
  const rendererCompiler = webpack(config.renderer);

  const devOptions: WebpackDevMiddlewareMoreOptions = {

    publicPath: config.renderer.output.publicPath,
    quiet: false,
    reload: true,
    overlay: true,
    writeToDisk: true,
    // stats: {
    //   colors: true,
    //   assets: false,
    // }
  };
  const devMiddleware = WebpackDevMiddleware(rendererCompiler, devOptions);
  const hotMiddleware = WebpackHotMiddleware(rendererCompiler);

  // rendererCompiler.hooks.compilation.tap('html-webpack-plugin-after-emit', () => {
  //   hotMiddleware.publish({
  //     action: 'reload'
  //   });
  // });


  // Renderer Server configuring
  const expressApp = express();
  expressApp.use(devMiddleware);
  expressApp.use(hotMiddleware);
  expressApp.use(express.static(DIST_PATH));

  // Renderer promise
  const rendererServerPromise = new Promise<RendererServer>((resolve, reject) => {
    const port = 3000;
    const server = expressApp.listen(port, 'localhost', (error) => {
      if (error) {
        reject(error);
      }
      logger.log('Renderer dev server listening on port ' + port + '\n');
      resolve({ server, port });
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
    logger.log(`Main has been built successfully!`);
  }


  const electron = require("electron");
  logger.info(`Starting the app with ${electron}...`);
  const rendererServerResult = await rendererServerPromise;

  return new Promise((resolve, reject) => {
    const env: NodeJS.ProcessEnv = {
      ...process.env,
      ELECTRON_WEBPACK_WDS_PORT: rendererServerResult.port.toString(10),
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

    logger.log(`App started at ${env.ELECTRON_WEBPACK_WDS_PORT}`);

    electronProcess.on("close", (code) => {
      logger.info(`App closed with code: ${code}`);
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
      logger.error(`Error occurred `, err);
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
  })

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
