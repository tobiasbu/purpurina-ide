import * as webpack from 'webpack';
import * as path from 'path';

import { merge } from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackNotifierPlugin from 'webpack-notifier';

import configBase from '../webpack.config.base';
import getEntry from '../commons/getEntry';
import type { ElectronRendererEnv } from '../types';

/**
 * Purpurina renderer configuration
 *
 * @param env Build environment
 */
export default function (env: ElectronRendererEnv): webpack.Configuration {
  const base = configBase(env, 'renderer');
  const IS_PROD = base.IS_PROD;
  const PORT = env.ELECTRON_WEBPACK_WDS_PORT ?? 3000;

  // hot module replacement
  const HOT_URL_PATH = `http://localhost:${PORT}/__webpack_hmr`;
  const entriesNames = ['launcher', 'editor'];
  const entries = getEntry(
    {
      PROJECT_PATH: env.PURPUR_PROJECT_PATH,
      HOT_MW: IS_PROD
        ? undefined
        : `webpack-hot-middleware/client?path=${HOT_URL_PATH}&reload=true`,
      subDir: 'renderer',
    },
    entriesNames
  );

  // Webpack config
  const config = merge(base.config, {
    target: 'electron-renderer',
    entry: entries.entry,
    output: {
      publicPath: base.PUBLIC_PATH,
      filename: '[name]/index.js',
    },
    module: {
      exprContextCritical: !IS_PROD,
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            configFile: path.join(entries.ENTRY_PATH, './tsconfig.json'),
          },
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
      new WebpackNotifierPlugin({
        title: 'Purpurina <Renderer>',
        alwaysNotify: true,
      }),
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
