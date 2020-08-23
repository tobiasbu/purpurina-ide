import * as webpack from 'webpack';
import * as path from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

import { WebpackBaseBuildConfig } from './types';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import getValue from './commons/getValue';

interface BaseConfig {
  PUBLIC_PATH: string;
  PURPURINA_PROJECT_PATH: string;
  IS_PROD: boolean;
  config: webpack.Configuration;
}

/**
 * Base webpack configuration.
 */
export default function (
  env: WebpackBaseBuildConfig,
  configType?: string
): BaseConfig {
  const PROJECT_PATH = path.resolve(__dirname, '../');

  const mode = getValue(env.NODE_ENV, 'development');
  const IS_PROD = mode !== 'development';
  const TYPE = configType || 'project';
  const PUBLIC_PATH = `/out/${IS_PROD ? 'dist' : 'dev'}/${TYPE}`;

  const baseConfig: webpack.Configuration = {
    mode,
    devtool: IS_PROD ? 'nosources-source-map' : 'source-map',
    context: PROJECT_PATH,
    output: {
      path: path.join(PROJECT_PATH, `./${PUBLIC_PATH}`),
      libraryTarget: 'commonjs2',
      filename: '[name].js',
      chunkFilename: '[name].bundle.js',
      hotUpdateChunkFilename: '.hot/[id].[hash].hot-update.js',
      hotUpdateMainFilename: '.hot/[hash].hot-update.json',
    },
    resolve: {
      plugins: [new TsconfigPathsPlugin({})],
      extensions: ['.ts', '.js', '.json'],
      alias: {
        '@shared': path.join(PROJECT_PATH, `./src/shared`),
      },
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          enforce: 'pre',
          loader: 'eslint-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            configFile: path.join(PROJECT_PATH, './tsconfig.base.json'),
          },
        },
      ],
    },
    // optimization: {
    //   minimize: IS_PROD === true,
    //   minimizer: [],
    //   noEmitOnErrors: true,
    //   nodeEnv: mode,
    // },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': IS_PROD ? '"production"' : '"development"',
        __PURPUR_DEV__: JSON.stringify(IS_PROD === false),
      }),
      new CleanWebpackPlugin(),
    ],
    externals: [],
    node: {
      __dirname: IS_PROD === false,
      __filename: IS_PROD === false,
    },
  };

  // Additional environment variables
  const additionalEnvironmentVariables = Object.keys(process.env).filter((it) =>
    it.startsWith('ELECTRON_WEBPACK_')
  );
  if (additionalEnvironmentVariables.length > 0) {
    baseConfig.plugins.push(
      new webpack.EnvironmentPlugin(additionalEnvironmentVariables)
    );
  }

  return {
    config: baseConfig,
    PURPURINA_PROJECT_PATH: PROJECT_PATH,
    PUBLIC_PATH,
    IS_PROD,
  };
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
