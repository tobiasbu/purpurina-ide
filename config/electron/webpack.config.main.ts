import * as webpack from 'webpack';
import * as path from 'path';

import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import WebpackNotifierPlugin from 'webpack-notifier';
import webpackMerge = require('webpack-merge');

import configBase from '../webpack.config.base';
import { WebpackBaseBuildConfig } from '../types';


export default (env: WebpackBaseBuildConfig): webpack.Configuration => {

  const base = configBase(env, 'main');

  const PROJECT_PATH = base.PURPURINA_PROJECT_PATH;
  const MAIN_ENTRY_PATH = path.join(PROJECT_PATH, './src/main');
  const HMR_ENTRY = path.join(PROJECT_PATH, './config/electron/hmr/main-hmr.ts');

  const config = webpackMerge.smart(
    base.config,
    {
      target: 'electron-main',
      entry: [HMR_ENTRY, path.join(MAIN_ENTRY_PATH + '/index.ts')],
      resolve: {
        mainFields: ["electron-main", "module", "main"],
        alias: {
          '@main': MAIN_ENTRY_PATH,
        },
      },
      plugins: [
        new webpack.HotModuleReplacementPlugin({ multiStep: true }),
        new WebpackNotifierPlugin({
          title: "Purpurina <Main>",
          alwaysNotify: true
        }),
        new CleanWebpackPlugin(),
      ],
      externals: [
        // './HmrClient',
        'source-map-support/source-map-support.js',
        'electron',
        'webpack'
      ]
    });

  // if (base.IS_PROD) {
    // config.plugins.push(new webpack.ExtendedAPIPlugin());
  // }

  return config;
}

//   const HTML_TEMPLATE_PATH = 'src/renderer/editor/static/index.html';

//   const DEV_MODE = env.DEV || env.HOT;
//   const DIST_PATH = path.join(PROJECT_PATH, '/dist/');
//   const mode = (DEV_MODE) ? 'development' : 'production';

//   console.log('#################################################');
//   console.log('Starting Electron Build');
//   console.log(`Mode ${mode}`);
//   console.log(`Project Path: ${PROJECT_PATH}`);
//   console.log('#################################################');

//   const config: webpack.Configuration = {
//     mode: mode,
//     devtool: 'source-map',
//     target: 'electron-main',
//     entry: {
//       main: path.join(ENTRY_PATH + '/index.ts')
//     },
//     output: {
//       path: DIST_PATH,
//       filename: '[name].js',
//       libraryTarget: 'commonjs',
//     },
//     resolve: {
//       extensions: ['.js', '.ts', '.json'],
//     },
//     module: {
//       rules: [
//         {
//           test: /\.ts?$/,
//           enforce: "pre",
//           loader: 'tslint-loader',
//           exclude: /node_modules/,
//           options: {
//             configFile: path.join(PROJECT_PATH, './tslint.json'),
//             tsConfigFile: path.join(ENTRY_PATH, './tsconfig.json'),
//             fix: true,
//           }
//         },
//         {
//           test: /\.ts?$/,
//           loader: 'ts-loader',
//           exclude: /node_modules/
//         }]
//     },
//   }

//   config.plugins.push(
//     new webpack.DefinePlugin({
//       'process.env': {
//         NODE_ENV: JSON.stringify(mode),
//       }
//     }),
//   );


//   if (DEV_MODE) {

//     config.plugins.push(
//       new webpack.NoEmitOnErrorsPlugin(),
//       // new webpack.HotModuleReplacementPlugin(),
//       (DEV_MODE) ? new CopyWebpackPlugin(
//         [
//           { from: HTML_TEMPLATE_PATH, to: DIST_PATH + 'editor/index.html', toType: 'file' },
//           { from: './resources', to: path.join(DIST_PATH, 'resources'), toType: 'dir' },
//           // {from: path.join(PROJECT_PATH, '/src/launcher/preload.js'), to: DIST_PATH },
//         ]
//       ) : null,
//     );
//   }



//   return config;

// }
