import * as webpack from 'webpack';

import mainWebpackConfig from './webpack.config.main';
import { Logger } from '../devLogger';
import { HmrServer } from './hmr/createHmrServer';
import { CommonEnv } from '../types';

export default async function compileMain(env: CommonEnv, hmrServer: HmrServer, logger: Logger) {

  await new Promise<webpack.Stats>((resolve, reject) => {
      logger.log('Compiling main...');
      const mainCompiler = webpack(mainWebpackConfig(env));
  });
}
