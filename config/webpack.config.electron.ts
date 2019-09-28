import * as webpack from 'webpack';
import * as path from 'path';
import * as merge from 'webpack-merge';
// import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import baseConfig, { PROJECT_PATH, Environment } from './webpack.config.base';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';


export default (env: Environment) => {

  console.log("PROJECT_PATH: " + PROJECT_PATH)
  const HTML_TEMPLATE_PATH = 'src/renderer/editor/static/index.html';
  const ENTRY_PATH = path.join(PROJECT_PATH, './src/app');
  const DEV_MODE = env.DEV || env.HOT;
  const DIST_PATH = path.join(PROJECT_PATH, '/dist/');
  const mode = (DEV_MODE) ? 'development' : 'production';

  const config: webpack.Configuration = {
    mode: mode,
    devtool: 'source-map',
    target: 'electron-main',
    entry: {
      app: path.join(ENTRY_PATH + '/index.ts')
    },
    output: {
      path: DIST_PATH,
      filename: '[name].js',
      libraryTarget: 'commonjs',
    },
    resolve: {
      extensions: ['.js', '.ts', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.ts?$/,
          enforce: "pre",
          loader: 'tslint-loader',
          exclude: /node_modules/,
          options: {
            configFile: path.join(PROJECT_PATH, './tslint.json'),
            tsConfigFile: path.join(ENTRY_PATH, './tsconfig.json'),
            fix: true,
          }
        },
        {
          test: /\.ts?$/,
          loader: 'ts-loader',
          exclude: /node_modules/
        }]
    },

    node: {
      __dirname: false,
      __filename: false
    },
    plugins: [],
    optimization: {
      minimize: false,
    },
    performance: {
      hints: 'warning'
    }
  }

  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(mode),
      }
    }),
  );


  if (DEV_MODE) {

    config.plugins.push(
      new webpack.NoEmitOnErrorsPlugin(),
      // new webpack.HotModuleReplacementPlugin(),
      (DEV_MODE) ? new CopyWebpackPlugin(
        [
          { from: HTML_TEMPLATE_PATH, to: DIST_PATH + 'editor/index.html', toType: 'file' },
          { from: './resources', to: path.join(DIST_PATH, 'resources'), toType: 'dir' },
          // {from: path.join(PROJECT_PATH, '/src/launcher/preload.js'), to: DIST_PATH }, 
        ]
      ) : null,
    );
  }



  return config;

}
