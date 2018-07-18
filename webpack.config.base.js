
const path = require('path');
const {
    dependencies: externals
} = require('./package.json');

module.exports = {

    context: __dirname,

    mode: 'development',

    output: {
        path: path.join(__dirname, '/build/'),
        publicPath: 'build/',
        // filename: '[name].js',
        // sourceMapFilename: '[name].js.map',
        libraryTarget: 'commonjs2',
    },

    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.json'],
        modules: [
            path.join(__dirname, 'app'),
            'node_modules',
      ]
    },

    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/
        }]
    },

    plugins: [],

    externals: Object.keys(externals || {})
};

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