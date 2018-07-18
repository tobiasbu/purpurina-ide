const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const path = require('path');

module.exports = merge(baseConfig, {
    devtool: 'source-map',

    entry: {
        'scintilla-ide': './src/index.ts'
    },

    output: {
        path: path.join(__dirname, '/build/'),
        filename: './index.js'
    },

    node: {
        __dirname: false,
        __filename: false
    },

    target: 'electron-main',

});