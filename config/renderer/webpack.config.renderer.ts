import * as webpack from 'webpack';
import * as path from 'path';

import webpackMerge = require('webpack-merge');
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as WebpackNotifierPlugin from 'webpack-notifier';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

import configBase from '../webpack.config.base';
import { WebpackBuildConfig } from "../types";

/**
 * Purpurina renderer configuration
 * @param env BUild enviroment
 */
export default function(env: WebpackBuildConfig): webpack.Configuration {

  // const include = [
  //   fs.realpathSync(path.join(PROJECT_PATH, './src/shared/maestro/')),
  // ];

  const PATH = `http://localhost:${env.port || 3000}/__webpack_hmr`;
  const HOT_MW = `webpack-hot-middleware/client?path=${PATH}&reload=true`;
  const ENTRY_PATH = path.join(env.projectPath, './src/renderer');

  const LAUNCHER_PATH = path.join(ENTRY_PATH, '/launcher');
  const EDITOR_PATH = path.join(ENTRY_PATH, '/editor');

  const LAUNCHER_ENTRY_PATH = path.join(LAUNCHER_PATH, '/index.ts');
  const EDITOR_ENTRY_PATH = path.join(EDITOR_PATH, '/index.ts');

  const config = webpackMerge.smart(
    configBase('renderer', env),
    {
      target: 'electron-renderer',
      entry: {
        'launcher': (env.isProduction) ? LAUNCHER_ENTRY_PATH : [HOT_MW, LAUNCHER_ENTRY_PATH],
        'editor': (env.isProduction) ? EDITOR_ENTRY_PATH : [HOT_MW, EDITOR_ENTRY_PATH],
      },
      output: {
        publicPath: `/dist/renderer`,
        filename: '[name]/index.bundle.js',
        hotUpdateChunkFilename: ".hot/[id].[hash].hot-update.js",
        hotUpdateMainFilename: ".hot/[hash].hot-update.json"
      },
      module: {
        exprContextCritical: !env.isProduction,
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
            exclude: /node_modules/
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
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  config: {
                    path: __dirname,
                  }
                }
              },
            ]
          },
          {
            test: /\.(jpe?g|png|gif)$/i,
            loaders: [
              {
                loader: 'file-loader',
                options: {
                  useRelativePaths: true,
                  name: (env.isProduction) ? '[sha512:hash:hex:9].[ext]' : '[name].[ext]',
                  emitFile: true,
                  outputPath: (url: string, resourcePath: string): string => {
                    const chunk = /launcher|editor/g.exec(resourcePath);
                    return `${chunk[0]}/img/${url}`;
                  }
                }
              },
              // 'file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]',
              // 'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false',
            ],
          },
          {
            test: /.svg$/i,
            loader: 'svg-inline-loader'
          }
        ],
      },
      plugins: [
        new webpack.DefinePlugin({
          'DEVELOPMENT': JSON.stringify(
            true
          ),
        }),
        new WebpackNotifierPlugin({
          title: "Purpurina <Renderer>",
          alwaysNotify: true,
          // logo: path.resolve("./img/favicon.png"),
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          filename: "launcher/index.html",
          inject: 'body',
          chunks: ['launcher'],
          template: path.join(LAUNCHER_PATH, `./index.html`),
          minify: false,
        }),
        new HtmlWebpackPlugin({
          filename: "editor/index.html",
          inject: 'body',
          chunks: ['editor'],
          template: path.join(EDITOR_PATH, `./index.html`),
          minify: false,
        }),
      ]
    });

  if (!env.isProduction) {
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
