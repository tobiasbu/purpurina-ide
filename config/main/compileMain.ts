import webpack from 'webpack';

import mainWebpackConfig from './webpack.config.main';
import type { Logger } from '../devLogger';
import type { EnvironmentConfig } from '../types';
import type { HmrServer } from '../electron-hmr/types';

interface MainCompiler {
  readonly compiler: webpack.Compiler;
  readonly watcher: webpack.Compiler.Watching;
  close(): void;
}

export default function compileMain(
  env: EnvironmentConfig,
  hmrServer: HmrServer,
  logger: Logger
) {
  return new Promise<MainCompiler>((resolve, reject) => {
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
        resolve({
          compiler: mainCompiler,
          watcher,
          close: function () {
            const w = watcher;
            if (w === null) {
              return;
            }

            w.close(() => {});
            watcher = null;
          },
        });
        resolve = null;
        return;
      }

      hmrServer.onCompiled(stats);
    });
  });
}
