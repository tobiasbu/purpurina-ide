import * as webpack from 'webpack';
import * as path from 'path';

import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import webpackMerge = require('webpack-merge');

import configBase from '../webpack.config.base';
import { WebpackBaseBuildConfig } from '../types';

export default (env: WebpackBaseBuildConfig): webpack.Configuration => {
  const base = configBase(
    {
      NODE_ENV: 'production',
    },
    'main'
  );

  const PROJECT_PATH = base.PURPURINA_PROJECT_PATH;
  const ENTRY = path.join(PROJECT_PATH, './config/electron-hmr/HmrClient.ts');

  const config = webpackMerge.smart(base.config, {
    target: 'electron-main',
    entry: {
      HmrClient: ENTRY,
    },
    output: {
      path: path.join(PROJECT_PATH, './out/dev'),
    },
    plugins: [new CleanWebpackPlugin()],
    externals: [
      'webpack/hot/log-apply-result',
      'source-map-support/source-map-support.js',
      'electron',
      'webpack',
      '../../../out/dev/HmrClient',
    ],
  });

  return config;
};
