

import * as webpack from 'webpack';
import * as path from 'path';
// const {
//     dependencies: externals
// } = require('./package.json');

export const PROJECT_PATH = path.resolve(__dirname, '../');

export interface Environment {
    DEV?: any,
    HOT?: any
}


const baseConfig: webpack.Configuration = {

    context: PROJECT_PATH,
    output: {
        path: path.join(__dirname, '/build/'),
        //publicPath: 'build/',
        // filename: '[name].js',
        // sourceMapFilename: '[name].js.map',
        libraryTarget: 'commonjs',
    },

    resolve: {
        extensions: ['.js', '.ts', '.json'],
    },


    plugins: [],

    externals: {}
};

export default baseConfig;

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