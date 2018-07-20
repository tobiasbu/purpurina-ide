const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const path = require('path');

module.exports = merge(baseConfig, {
    devtool: 'source-map',

    entry: {
        'scintilla-ide': './src/app/index.ts'
    },

    output: {
        path: path.join(__dirname, '/build/'),
        filename: './index.js'
    },

    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/
        }]
    },

    node: {
        __dirname: false,
        __filename: false
    },

    target: 'electron-main',

    plugins: [
        // Add source map support for stack traces in node
        // https://github.com/evanw/node-source-map-support
        // new webpack.BannerPlugin(
        //   'require("source-map-support").install();',
        //   { raw: true, entryOnly: false }
        // ),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ]

});