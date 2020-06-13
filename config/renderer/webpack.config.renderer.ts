import * as webpack from 'webpack';
import * as path from 'path';

import webpackMerge = require('webpack-merge');
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackNotifierPlugin from 'webpack-notifier';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

import configBase from '../webpack.config.base';
import { DevServerBuildConfig } from '../types';

/**
 * Purpurina renderer configuration
 *
 * @param env Build environment
 */
export default function (env: DevServerBuildConfig): webpack.Configuration {
  const base = configBase(env, 'renderer');
  const PROJECT_PATH = base.PURPURINA_PROJECT_PATH;
  const IS_PROD = env.NODE_ENV.toLowerCase() === 'production';
  const PUBLIC_PATH = '/out/dev/renderer';

  // hot module replacement
  const PATH = `http://localhost:${env.PORT || 3000}/__webpack_hmr`;
  const HOT_MW = `webpack-hot-middleware/client?path=${PATH}&reload=true`;

  // entry paths
  const ENTRY_PATH = path.join(PROJECT_PATH, './src/renderer');

  const LAUNCHER_PATH = path.join(ENTRY_PATH, '/launcher');
  const EDITOR_PATH = path.join(ENTRY_PATH, '/editor');

  const LAUNCHER_ENTRY_PATH = path.join(LAUNCHER_PATH, '/index.ts');
  const EDITOR_ENTRY_PATH = path.join(EDITOR_PATH, '/index.ts');



  // Webpack config
  const config = webpackMerge.smart(base.config, {
    // https://gist.github.com/earksiinni/053470a04defc6d7dfaacd5e5a073b15
    // target: 'web',
    target: 'electron-renderer',
    entry: {
      launcher: IS_PROD ? LAUNCHER_ENTRY_PATH : [HOT_MW, LAUNCHER_ENTRY_PATH],
      editor: IS_PROD ? EDITOR_ENTRY_PATH : [HOT_MW, EDITOR_ENTRY_PATH],
    },
    output: {
      publicPath: PUBLIC_PATH,
      filename: '[name]/index.bundle.js',
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
      new HtmlWebpackPlugin({
        filename: 'launcher/index.html',
        inject: 'body',
        chunks: ['launcher'],
        template: path.join(LAUNCHER_PATH, `./index.html`),
        minify: false,
      }),
      new HtmlWebpackPlugin({
        filename: 'editor/index.html',
        inject: 'body',
        chunks: ['editor'],
        template: path.join(EDITOR_PATH, `./index.html`),
        minify: false,
      }),
    ]
  });

  if (!IS_PROD) {
    // config.externals = [
    //   'source-map-support/source-map-support.js',
    // ];
    config.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    );
  }
  return config;
}
