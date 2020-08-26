import * as webpack from 'webpack';
import * as path from 'path';

import WebpackNotifierPlugin from 'webpack-notifier';
import webpackMerge = require('webpack-merge');

import type { BaseEnvironmentConfig } from '../types';
import configBase from '../webpack.config.base';
import getEntry from '../commons/getEntry';

export default (env: BaseEnvironmentConfig): webpack.Configuration => {
  const base = configBase(env, 'main');

  const entry = getEntry(
    {
      PROJECT_PATH: base.PROJECT_PATH,
      HOT_MW: !base.IS_PROD
        ? path.join(base.PROJECT_PATH, './config/electron-hmr/main-hmr.ts')
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
    ],
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            configFile: path.join(entry.dir.main, './tsconfig.json'),
          },
        },
      ],
    },
    externals: [
      'webpack/hot/log-apply-result',
      'source-map-support/source-map-support.js',
      'electron',
      'webpack',
    ],
    optimization: {
      splitChunks: {
        chunks: 'async',
      },
    },
  });

  return config;
};
