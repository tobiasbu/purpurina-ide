import webpack from 'webpack';

import preloadWebpackConfig from './webpack.config.preload';
import type { Logger } from '../devLogger';
import type { CommonEnv } from '../types';

export default function compilePreload(env: CommonEnv, logger: Logger) {
  return new Promise((resolve, reject) => {
    logger.log(`Compiling preload...`);
    const preloadCompiler = webpack(preloadWebpackConfig(env), () => {
      logger.log(`Preload has been built successfully!`);
    });
    resolve();

    // preloadCompiler.watch({}, (error, stats) => {
    //   if (error && reject !== null) {
    //     reject(error);
    //     reject = null;
    //     return;
    //   }

    //   const info = stats.toJson();
    //   if (stats.hasErrors()) {
    //     logger.error('Preload error:\n', info.errors.join('\n\n'));
    //     if (reject !== null) {
    //       reject();
    //       return;
    //     }
    //   }

    //   if (stats.hasWarnings()) {
    //     logger.warn('Preload warnings:\n:', info.warnings.join('\n\n'));
    //   }
    //   if (resolve !== null) {
    //     logger.log(`Preload has been built successfully!`);
    //     resolve();
    //     resolve = null;
    //     return;
    //   }
    // });

    // require('async-exit-hook')((callback?: () => void) => {
    //   const w = watcher;
    //   if (w === null) {
    //     return;
    //   }

    //   watcher = null;
    //   w.close(() => {
    //     if (callback) {
    //       callback()
    //     }
    //   });
    // });
  });
}
