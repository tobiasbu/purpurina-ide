

import * as webpack from 'webpack';
import * as path from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

import { WebpackBuildConfig } from './types';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

export const PROJECT_PATH = path.resolve(__dirname, '../');

/**
 * Base webpack configuration.
 */
export default (type: string, env: WebpackBuildConfig): webpack.Configuration => {

  const PROJECT_PATH = path.resolve(__dirname, '../');
  // if (env.isProduction === undefined) {
  //   env.isProduction = env.mode === "production";
  // }
  const mode = env.isProduction ? "production" : "development";

  const baseConfig: webpack.Configuration = {
    mode,
    devtool: env.isProduction ? 'nosources-source-map' : 'source-map',
    context: PROJECT_PATH,
    output: {
      path: path.join(PROJECT_PATH, `./dist/${type}`),
      libraryTarget: 'commonjs2',
      filename: "[name].js",
      chunkFilename: "[name].bundle.js",
    },
    resolve: {
      plugins: [new TsconfigPathsPlugin({})],
      extensions: ['.ts', '.js', '.json'],
      alias: {
        '@shared': path.join(PROJECT_PATH, `./shared`),
      }
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          enforce: "pre",
          loader: 'eslint-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          exclude: /node_modules/
        }]
    },
    optimization: {
      minimize: env.isProduction === true,
      minimizer: [],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': env.isProduction ? "\"production\"" : "\"development\"",
        'DEVELOPMENT': JSON.stringify(env.isProduction),
      }),
    ],
    externals: {},
    node: {
      __dirname: env.isProduction === false,
      __filename: env.isProduction === false,
    },
  };

  if (env.isProduction) {
    baseConfig.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    );
  }

  return baseConfig;

}

// const common_config = {
//   node: {
//     __dirname: true
//   },
//   mode: process.env.ENV || 'development',
//   module: {
//     rules: [
//       {
//         test: /\.tsx?$/,
//         use: 'ts-loader',
//         exclude: [
//           /node_modules/,
//            path.resolve(__dirname, "src/ui")
//         ]
//       }
//     ]
//   },
//   resolve: {
//     extensions: [ '.tsx', '.ts', '.js' ]
//   },
// };

// module.exports = [
//   Object.assign({}, common_config, {
//     target: 'electron-main',
//     entry: {
//       renderer: './src/index.ts',
//     },
//     output: {
//       filename: '[name]-bundle.js',
//       path: path.resolve(__dirname, 'src/main/dist'),
//       sourceMapFilename: '[name].js.map',
//       chunkFilename: '[id].chunk.js'
//     },
//   }),
//   Object.assign({}, common_config, {
//     target: 'electron-renderer',
//     entry: {
//       ui: './src/renderer/index.ts',
//     },
//     output: {
//       filename: '[name]-bundle.js',
//       path: path.resolve(__dirname, 'src/renderer/dist')
//     },
//   })
// ]
