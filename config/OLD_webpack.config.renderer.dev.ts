'use strict';

require("ts-node").register({
  transpileOnly: true,
});

import * as fs from 'fs';
import * as webpack from 'webpack';
import * as merge from 'webpack-merge';
import * as path from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import baseConfig, { PROJECT_PATH } from './webpack.config.base';
import { execSync, spawn } from 'child_process';
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");


const PORT = process.env.PORT || 8080;
const PUBLIC_PATH = `http://localhost:${PORT}`;

const DLL_PATH = path.resolve(PROJECT_PATH, './dist/dll');
const DLL_MANIFEST = path.resolve(DLL_PATH, 'rendererDLL.json');
const requiredByDLLConfig = module.parent.filename.includes(
  'webpack.config.renderer.dll'
);

if (!requiredByDLLConfig && !(fs.existsSync(DLL_PATH) && fs.existsSync(DLL_MANIFEST))) {
  console.warn(
    //chalk.black.bgYellow.bold(
    'The DLL files are missing. Sit back while we build them for you with "npm run build-dll"'
    //)
  );
  execSync('npm run build-dll');
}

const ENTRY_PATH = path.join(PROJECT_PATH, './src/renderer');


interface WebpackConfigWithDevServer extends webpack.Configuration {
  devServer?: {
    port?: number,
    publicPath?: string,
    compress?: boolean,
    noInfo?: boolean,
    stats?: string,
    inline?: boolean,
    lazy?: boolean,
    hot?: boolean,
    headers?: string | any,
    contentBase?: string,
    watchOptions?: {
      aggregateTimeout?: number;
      ignored?: string | string[] | RegExp;
      poll?: number
    },
    historyApiFallback?: {
      verbose?: boolean,
      disableDotRule?: boolean
    },
    before?: () => void;
  }
}

const config: WebpackConfigWithDevServer = {

  devtool: 'source-map',

  mode: 'development',

  target: 'electron-renderer',

  entry: [
    `webpack-dev-server/client?http://localhost:${PORT}/`,
    'webpack/hot/only-dev-server',
    path.join(ENTRY_PATH, '/index.ts'),
  ],

  output: {
    publicPath: `http://localhost:${PORT}/dist/`,
    filename: 'renderer.dev.js',
    sourceMapFilename: 'renderer.dev.js.map',
    libraryTarget: 'commonjs'
  },


  module: {

    rules: [{
      test: /\.tsx?$/,
      loader: "awesome-typescript-loader",
      exclude: /node_modules/,
    },
    // Extract all .global.css to style.css as is
    {
      test: /\.css$/,
      use: [
        'style-loader',// MiniCssExtractPlugin.loader,
        { loader: 'css-loader', options: { importLoaders: 1 } },
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            // sourceMap: 'inline',
            // plugins: [
            //   require('postcss-import')(),
            // ]
          },

        },


      ]
    },
    // SVG Font
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        mimetype: 'image/svg+xml',
      }
    },
    // Common Image Formats
    {
      test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
      loader: 'url-loader',
    }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
          minChunks: 1,
          reuseExistingChunk: true,
        }
      }
    }
  },

  plugins: [

    // new MiniCssExtractPlugin({
    //   filename: '[name].bundle.css'
    // }),

    requiredByDLLConfig
      ? null
      : new webpack.DllReferencePlugin({
        context: path.join(__dirname, 'dll'), //process.cwd(),
        manifest: require(DLL_MANIFEST),
        sourceType: 'var'
      }),

    new webpack.HotModuleReplacementPlugin({
      multiStep: true,
    }),

    new webpack.NoEmitOnErrorsPlugin(),


    // https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
    // https://github.com/webpack/webpack/issues/864
    //new webpack.optimize.OccurrenceOrderPlugin(true),

    // NODE_ENV should be production so that modules do not perform certain development checks
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify('development'),
    //   env: JSON.stringify('development')
    // }),

    // new webpack.ProvidePlugin({
    //   React: 'react',
    //   ReactDOM: 'react-dom',
    //   // $: 'jquery',
    //   // jQuery: 'jquery'
    // }),
   
    /**
     * Create global constants which can be configured at compile time.
     *
     * Useful for allowing different behaviour between development builds and
     * release builds
     *
     * NODE_ENV should be production so that modules do not perform certain
     * development checks
     *
     * By default, use 'development' as NODE_ENV. This can be overriden with
     * 'staging', for example, by changing the ENV variables in the npm scripts
     */
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),

    new webpack.LoaderOptionsPlugin({
      debug: true,
    })
  ],

  node: {
    __dirname: false,
    __filename: false
  },

  devServer: {
    port: (typeof PORT === 'string') ? parseInt(PORT) : PORT,
    publicPath: PUBLIC_PATH,
    compress: true,
    noInfo: true,
    stats: 'errors-only',
    inline: true,
    lazy: false,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    contentBase: path.join(PROJECT_PATH, 'dist'),
    watchOptions: {
      aggregateTimeout: 300,
      ignored: /node_modules/,
      poll: 100
    },
    historyApiFallback: {
      verbose: true,
      disableDotRule: false
    },
    before() {
      if (process.env.START_HOT || process.env.HOT) {
        console.log('\n\n- Starting Electron Process...\n\n');
        spawn('npm', ['run', 'start-electron'], {
          shell: true,
          env: process.env,
          stdio: 'inherit'
        })
          .on('close', code => process.exit(code))
          .on('error', spawnError => console.error(spawnError));
      }

    }
  }

}

export default merge.smart(baseConfig, config);