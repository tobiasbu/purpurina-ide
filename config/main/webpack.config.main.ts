import * as webpack from 'webpack';
import * as path from 'path';

import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import WebpackNotifierPlugin from 'webpack-notifier';
import webpackMerge = require('webpack-merge');

import configBase from '../webpack.config.base';
import { WebpackBaseBuildConfig } from '../types';
import getEntry from '../commons/getEntry';

export default (env: WebpackBaseBuildConfig): webpack.Configuration => {
  const base = configBase(env, 'main');
  const PROJECT_PATH = base.PURPURINA_PROJECT_PATH;

  const entry = getEntry(
    {
      PROJECT_PATH,
      HOT_MW: !base.IS_PROD
        ? path.join(PROJECT_PATH, './config/electron-hmr/main-hmr.ts')
        : undefined,
    },
    ['main']
  );

  const config = webpackMerge.smart(base.config, {
    target: 'electron-main',
    entry: entry.entry,
    resolve: {
      mainFields: ['electron-main', 'module', 'main'],
      alias: {
        '@main': entry.dir.main,
      },
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new WebpackNotifierPlugin({
        title: 'Purpurina <Main>',
        alwaysNotify: true,
      }),
      new CleanWebpackPlugin(),
    ],
    externals: [
      'fsevents',
      'webpack/hot/log-apply-result',
      'source-map-support/source-map-support.js',
      'electron',
      'webpack',
    ],
  });

  return config;
};
