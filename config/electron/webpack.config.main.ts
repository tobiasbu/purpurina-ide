import * as webpack from 'webpack';
import * as path from 'path';

import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import * as WebpackNotifierPlugin from 'webpack-notifier';
import webpackMerge = require('webpack-merge');

import configBase, { PROJECT_PATH } from '../webpack.config.base';
import { WebpackBuildConfig } from '../types';


export default (env: WebpackBuildConfig): webpack.Configuration => {

  const MAIN_ENTRY_PATH = path.join(PROJECT_PATH, './src/main');

  const config = webpackMerge.smart(
    configBase('main', env),
    {
      target: 'electron-main',
      entry: {
        main: path.join(MAIN_ENTRY_PATH + '/index.ts')
      },
      resolve: {
        mainFields: ["electron-main", "module", "main"],
        alias: {
          '@main': path.join(PROJECT_PATH, `./src/main`),
        }
      },
      plugins: [
        new WebpackNotifierPlugin({
          title: "Purpurina <Main>",
          alwaysNotify: true
        }),
        new CleanWebpackPlugin(),
      ]
    });

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
