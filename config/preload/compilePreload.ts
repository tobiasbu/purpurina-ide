import webpack from 'webpack';

import preloadWebpackConfig from './webpack.config.preload';
import type { Logger } from '../devLogger';
import type { CommonEnv } from '../types';

export default function compilePreload(env: CommonEnv, logger: Logger) {
  return new Promise((resolve, reject) => {
    logger.log(`Compiling preload...`);
    let preloadCompiler = webpack(preloadWebpackConfig(env), () => {
      logger.log(`Preload has been built successfully!`);
      resolve(preloadCompiler);
    });
  });
}
