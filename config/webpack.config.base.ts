

import * as webpack from 'webpack';
import * as path from 'path';
import { BuildEnvironment } from './types';

export const PROJECT_PATH = path.resolve(__dirname, '../');

export default (type: string, entryPath: string, env: BuildEnvironment) => {

  const PROJECT_PATH = path.resolve(__dirname, '../');
  env.isProduction = env.MODE === "production";
  const mode = env.isProduction ? "production" : "development";

  const baseConfig: webpack.Configuration = {
    mode,
    devtool: env.isProduction ? 'source-map' : 'eval',
    context: PROJECT_PATH,
    output: {
      path: path.join(PROJECT_PATH, `./dist/${type}`),
      libraryTarget: 'commonjs2',
      filename: "[name].bundle.js",
      chunkFilename: "[name].chunk.js",
    },
    resolve: {
      extensions: ['.ts', '.js', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          enforce: "pre",
          loader: 'tslint-loader',
          exclude: /node_modules/,
          options: {
            configFile: path.join(PROJECT_PATH, './tslint.json'),
            tsConfigFile: path.join(entryPath, './tsconfig.json'),
            fix: true,
          }
        },
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          exclude: /node_modules/
        }]
    },
    optimization: {
      minimize: false,
      minimizer: [],
    },
    plugins: [],
    externals: {},
    node: {
      __dirname: true,
      __filename: true,
    }
  };

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