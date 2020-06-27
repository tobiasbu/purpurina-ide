import * as webpack from 'webpack';

import webpackMerge = require('webpack-merge');

import configBase from '../webpack.config.base';
import { WebpackBaseBuildConfig } from '../types';
import getEntry from '../commons/getEntry';

/**
 * Purpurina preload configuration
 *
 * @param env Build environment
 */
export default function (env: WebpackBaseBuildConfig): webpack.Configuration {
  const base = configBase(env, 'preload');
  const PROJECT_PATH = base.PURPURINA_PROJECT_PATH;
  const IS_PROD = base.IS_PROD;

  const entries = getEntry(
    {
      PROJECT_PATH,
      subDir: 'preload',
    },
    ['index.ts']
  );

  // Webpack config
  const config = webpackMerge.smart(base.config, {
    target: 'electron-preload',
    entry: entries.entry,
    output: {
      filename: 'index.js',
    },
    resolve: {
      mainFields: ['electron-preload', `preload`],
    },
    module: {
      exprContextCritical: !IS_PROD,
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.p?css$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                url: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                config: {
                  path: __dirname,
                },
              },
            },
          ],
        },
        {
          test: /\.(jpe?g|png|gif)$/i,
          loaders: [
            {
              loader: 'file-loader',
              options: {
                useRelativePaths: true,
                name: IS_PROD ? '[sha512:hash:hex:9].[ext]' : '[name].[ext]',
                emitFile: true,
                outputPath: (url: string, resourcePath: string): string => {
                  const chunk = /launcher|editor/g.exec(resourcePath);
                  return `${chunk[0]}/img/${url}`;
                },
              },
            },
            // 'file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]',
            // 'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false',
          ],
        },
        {
          test: /.svg$/i,
          loader: 'svg-inline-loader',
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        DEVELOPMENT: JSON.stringify(true),
      }),
    ],
  });

  if (!IS_PROD) {
    config.plugins.push(
      // new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    );
  }
  return config;
}
