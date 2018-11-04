
import * as webpack from 'webpack';
import * as path from 'path';
import * as merge from 'webpack-merge';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import baseConfig, { PROJECT_PATH, Enviroment } from './webpack.config.base';
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const HTML_TEMPLATE_PATH = './src/renderer/pages/template_web.html';
const ENTRY_PATH = './src/renderer';


export default (env: Enviroment) => {

    const DEV_MODE = env.DEV || env.HOT;
    const mode = (DEV_MODE) ? 'development' : 'production';


    const config: webpack.Configuration = {
        mode: mode,
        devtool: 'cheap-module-source-map',
        watch: env.HOT,// || env.build_watch,
        target: 'electron-renderer',

        entry: {
            'renderer': ENTRY_PATH + '/index.ts'
        },

        output: {
            path: path.join(PROJECT_PATH, './dist/'),
            //publicPath: '../build/',
            filename: '[name].js',
            sourceMapFilename: '[name].js.map',
            ...DEV_MODE ? {} : {
                libraryTarget: 'umd',
                umdNamedDefine: true
            }
        },

        resolve: {
            alias: {
                'ts': path.join(PROJECT_PATH, ENTRY_PATH),
            }
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
                    (DEV_MODE) ? 'style-loader' : MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { importLoaders: 1 }},
                    { 
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                        }
                    }
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

        plugins: [
            
            new MiniCssExtractPlugin({
            filename: '[name].bundle.css'
            }),
            // https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
            // https://github.com/webpack/webpack/issues/864
            new webpack.optimize.OccurrenceOrderPlugin(true),

            // NODE_ENV should be production so that modules do not perform certain development checks
            new webpack.DefinePlugin({
                // 'process.env.NODE_ENV': mode,
                env: JSON.stringify(mode),
                'process.env': {
                    NODE_ENV: JSON.stringify(mode)
                }
            }),

            new webpack.ProvidePlugin({
                React: 'react',
                ReactDOM: 'react-dom',
                // $: 'jquery',
                // jQuery: 'jquery'
            }),

            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: HTML_TEMPLATE_PATH,
                inject: false,
            })
        ].concat(env.HOT ? [

            new BrowserSyncPlugin({
                files: './dist/**/*.*',
                hostname: 'localhost',
                port: 8080,
                server: {
                    baseDir: ['dist']
                },
                reloadDelay: 50,
                injectChanges: false,
                reloadDebounce: 500,
                reloadOnRestart: true
            })

        ] : [])
    }

    return merge(baseConfig, config);

}
