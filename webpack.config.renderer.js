const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

const HtmlWebpackPlugin = require('html-webpack-plugin');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HTML_INDEX_PATH = path.join(__dirname, './public/index.html');

module.exports = merge(baseConfig, {
    devtool: 'source-map',

    entry: [
        './src/ui/index.tsx'
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

                test: /\.(ts|tsx)$/,
                loader: "awesome-typescript-loader"
            },
            // Extract all .global.css to style.css as is
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
                // use: ExtractTextPlugin.extract({
                //     use: [{
                //             loader: 'css-loader',
                //             options: {
                //                 //modules: true,
                //                 importLoaders: 1,
                //                 localIdentName: '[name]__[local]__[hash:base64:5]',
                //             }
                //         },
                //         {
                //             loader: 'sass-loader'
                //         }
                //     ]
                // })
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

        //new ExtractTextPlugin('style.css'),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: HTML_INDEX_PATH,
            inject: false
        })
    ]


});