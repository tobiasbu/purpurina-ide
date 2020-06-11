

import * as webpack from 'webpack';
import * as path from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

import { WebpackBaseBuildConfig } from './types';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import getValue from './commons/getValue';

/**
 * Base webpack configuration.
 */
export default (env: WebpackBaseBuildConfig, configType?: string): { config: webpack.Configuration, PURPURINA_PROJECT_PATH: string } => {

  const PROJECT_PATH = path.resolve(__dirname, '../');

  const mode = getValue(env.NODE_ENV, 'development');
  const IS_PROD = mode === 'development';
  const TYPE = configType || 'project';

  const baseConfig: webpack.Configuration = {
    mode,
    devtool: IS_PROD ? 'nosources-source-map' : 'source-map',
    context: PROJECT_PATH,
    output: {
      path: path.join(PROJECT_PATH, `./dist/${TYPE}`),
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
          test: /\.ts$/,
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
      minimize: IS_PROD === true,
      minimizer: [],
      noEmitOnErrors: true,
      nodeEnv: mode,
    },
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': IS_PROD ? "\"production\"" : "\"development\"",
        'PURPUR_DEVELOPMENT': JSON.stringify(IS_PROD === false),
      }),
    ],
    externals: [
      "source-map-support/source-map-support.js"
    ],
    node: {
      __dirname: IS_PROD === false,
      __filename: IS_PROD === false,
    },
  };

  // Additional environment variables
  const additionalEnvironmentVariables = Object.keys(process.env).filter(it => it.startsWith("ELECTRON_WEBPACK_"))
  if (additionalEnvironmentVariables.length > 0) {
    baseConfig.plugins.push(new webpack.EnvironmentPlugin(additionalEnvironmentVariables))
  }


  if (!IS_PROD) {
    baseConfig.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    );
  }

  return { config: baseConfig,  PURPURINA_PROJECT_PATH: PROJECT_PATH };
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
