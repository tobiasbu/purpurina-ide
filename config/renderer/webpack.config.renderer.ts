import * as webpack from 'webpack';
import * as path from 'path';

import webpackMerge = require('webpack-merge');
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackNotifierPlugin from 'webpack-notifier';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

import configBase from '../webpack.config.base';
import { DevServerBuildConfig } from '../types';
import getEntry from '../commons/getEntry';

/**
 * Purpurina renderer configuration
 *
 * @param env Build environment
 */
export default function (env: DevServerBuildConfig): webpack.Configuration {
  const base = configBase(env, 'renderer');
  const PROJECT_PATH = base.PURPURINA_PROJECT_PATH;
  const IS_PROD = base.IS_PROD;

  // hot module replacement
  const HOT_URL_PATH = `http://localhost:${env.PORT || 3000}/__webpack_hmr`;
  const entriesNames = ['launcher', 'editor'];
  const entries = getEntry(
    {
      PROJECT_PATH,
      HOT_MW: IS_PROD
        ? undefined
        : `webpack-hot-middleware/client?path=${HOT_URL_PATH}&reload=true`,
      subDir: 'renderer',
    },
    entriesNames
  );

  // Webpack config
  const config = webpackMerge.smart(base.config, {
    // https://gist.github.com/earksiinni/053470a04defc6d7dfaacd5e5a073b15
    // target: 'web',
    target: 'electron-renderer',
    entry: entries.entry,
    output: {
      publicPath: base.PUBLIC_PATH,
      filename: '[name]/index.js',
    },
    module: {
      exprContextCritical: !IS_PROD,
      rules: [
        // {
        //   test: /\.ts$/,
        //   enforce: "pre",
        //   loader: 'eslint-loader',
        //   exclude: /node_modules/,
        // },
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
      new WebpackNotifierPlugin({
        title: 'Purpurina <Renderer>',
        alwaysNotify: true,
        // logo: path.resolve("./img/favicon.png"),
      }),
      new CleanWebpackPlugin(),
    ],
    externals: ['debug-menu', 'source-map-support/source-map-support.js'],
  });

  for (let i = 0; i < entriesNames.length; i += 1) {
    config.plugins.push(
      new HtmlWebpackPlugin({
        filename: `${entriesNames[i]}/index.html`,
        inject: 'body',
        chunks: [entriesNames[i]],
        template: path.join(entries.dir[entriesNames[i]], `./index.html`),
        minify: false,
      })
    );
  }

  if (!IS_PROD) {
    config.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    );
  }
  return config;
}
