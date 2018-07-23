const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = require('./webpack.config.base');

const HTML_INDEX_PATH = path.join(__dirname, './src/renderer/layout/index.html');

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'source-map',

    entry: [
        './src/renderer/index.tsx'
    ],

    output: {
        path: path.join(__dirname, '/build/dist/'),
        publicPath: '../dist/',
        filename: './index.js',
        libraryTarget: 'umd'
    },

    target: 'electron-renderer',

    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // },

    module: {
        rules: [{

                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },
            // Extract all .global.css to style.css as is
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
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

    plugins: [
        // https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
        // https://github.com/webpack/webpack/issues/864
        new webpack.optimize.OccurrenceOrderPlugin(),

        // NODE_ENV should be production so that modules do not perform certain development checks
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),


        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom',
            $: 'jquery',
            jQuery: 'jquery'
        }),


        //new ExtractTextPlugin('style.css'),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: HTML_INDEX_PATH,
            inject: false
        })
    ]


});