import * as webpack from 'webpack';
import * as path from 'path';

import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import webpackMerge = require('webpack-merge');

import configBase, { PROJECT_PATH } from './webpack.config.base';
import { BuildEnvironment } from './types';

function createRendererConfig(env: BuildEnvironment) {

  const PORT = process.env.PORT || 3000;
  const HOT_MW = `webpack-hot-middleware/client?path=http://localhost:${PORT}/__webpack_hmr&reload=true`;
  const ENTRY_PATH = path.join(PROJECT_PATH, './src/renderer');

  const LAUNCHER_PATH = path.join(ENTRY_PATH, '/launcher');
  const EDITOR_PATH = path.join(ENTRY_PATH, '/editor');

  const LAUNCHER_ENTRY_PATH = path.join(LAUNCHER_PATH, '/index.ts');
  const EDITOR_ENTRY_PATH =  path.join(EDITOR_PATH, '/index.ts');
 

  const config = webpackMerge.smart(
    configBase('renderer', ENTRY_PATH, env),
    {
      target: 'electron-renderer',
      entry: {
        'launcher': (env.isProduction) ? LAUNCHER_ENTRY_PATH : [LAUNCHER_ENTRY_PATH, HOT_MW],
        'editor': (env.isProduction) ? EDITOR_ENTRY_PATH : [EDITOR_ENTRY_PATH, HOT_MW],
      },
      output: {
        publicPath: `http://localhost:${PORT}/dist/`,
        filename: '[name]/index.bundle.js',
      },
      module: {
        rules: [
          {
            test: /\.css$/,
            use: [
              'style-loader',
              { loader: 'css-loader', options: { importLoaders: 1 } },
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  config: {
                    path: __dirname,
                  }
                }
              }
            ]
          }
        ],
      },
      plugins: [
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
    config.plugins.push(
      new webpack.HotModuleReplacementPlugin({
        multiStep: false,
      }),
      new webpack.NoEmitOnErrorsPlugin()
    );
  }
 
  return config;
}

export default (env: BuildEnvironment) => {

  const MAIN_ENTRY_PATH = path.join(PROJECT_PATH, './src/main');
  const RENDER_ENTRY_PATH = path.join(PROJECT_PATH, './src/renderer');

  return {
    main: webpackMerge.smart(
      configBase('main', MAIN_ENTRY_PATH, env),
      {
        target: 'electron-main',
        entry: {
          main: path.join(MAIN_ENTRY_PATH + '/index.ts')
        },
        resolve: {
          mainFields: ["electron-main", "module", "main"]
        },
        plugins: [
          new CleanWebpackPlugin(),
          new webpack.DefinePlugin({
            'process.env': {
              NODE_ENV: JSON.stringify(env.MODE),
            }
          }),
          new webpack.NoEmitOnErrorsPlugin(),
        ]
      }),
      renderer: createRendererConfig(env),
  }
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
