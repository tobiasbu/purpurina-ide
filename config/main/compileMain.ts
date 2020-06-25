import webpack from 'webpack';

import mainWebpackConfig from './webpack.config.main';
import type { Logger } from '../devLogger';
import type { CommonEnv } from '../types';
import type { HmrServer } from '../electron-hmr/types';

export default function compileMain(
  env: CommonEnv,
  hmrServer: HmrServer,
  logger: Logger
) {
  return new Promise((resolve, reject) => {
    const mainCompiler = webpack(mainWebpackConfig(env));

    mainCompiler.hooks.compile.tap('electron-webpack-dev-runner', () => {
      hmrServer.onBeforeCompile();
      logger.log('Compiling main...');
    });

    let watcher = mainCompiler.watch({}, (error, stats) => {
      if (error && reject !== null) {
        reject(error);
        reject = null;
        return;
      }

      const info = stats.toJson();
      if (stats.hasErrors()) {
        logger.error('Main error:\n', info.errors.join('\n\n'));
        if (reject !== null) {
          reject();
          return;
        }
      }

      if (stats.hasWarnings()) {
        logger.warn('Main warnings:\n:', info.warnings.join('\n\n'));
      }
      if (resolve !== null) {
        logger.log(`Main has been built successfully!`);
        resolve();
        resolve = null;
        return;
      }

      hmrServer.onCompiled(stats);
    });

    require('async-exit-hook')((callback?: () => void) => {
      const w = watcher;
      if (w === null) {
        return;
      }

      watcher = null;
      w.close(() => {
        if (callback) {
          callback();
        }
      });
    });
  });
}
