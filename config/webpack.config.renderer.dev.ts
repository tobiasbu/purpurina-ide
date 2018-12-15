import * as webpack from 'webpack';
import * as path from 'path';
import { PROJECT_PATH } from './webpack.config.base';

const PORT = process.env.PORT || 8080;
// const HOT_MW = 'webpack-hot-middleware/client?reload=true';
const HOT_MW = `webpack-hot-middleware/client?path=http://localhost:${PORT}/__webpack_hmr&reload=true`;
const ENTRY_PATH = path.join(PROJECT_PATH, './src/renderer/');


const config: webpack.Configuration = {
    devtool: 'source-map',
    mode: 'development',
    // https://github.com/chentsulin/webpack-target-electron-renderer#how-this-module-works
    target: 'electron-renderer',

    entry: {
        
        'laucher': [path.join(ENTRY_PATH, '/laucher/index.ts'), HOT_MW],
        'editor': [path.join(ENTRY_PATH, '/editor/index.ts'), HOT_MW],
        // 'preload-laucher': path.join(ENTRY_PATH, '/laucher/preload.ts'),
    },

    output: {
        publicPath: `http://localhost:${PORT}/dist/`,
        path: path.join(PROJECT_PATH, 'dist'),
        filename: '[name]/index.dev.js',
        // https://github.com/webpack/webpack/issues/1114
        libraryTarget: 'commonjs2',
    },

    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.json'],
    },

    module: {
        
        rules: [{
            test: /\.tsx?$/,
            loader: "awesome-typescript-loader",
            options: {
                configFileName: path.join(PROJECT_PATH, 'src/shared/tsconfig.json'),
            },
            exclude: /node_modules/,
        }]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),

        new webpack.NoEmitOnErrorsPlugin(),

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),

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
        // new webpack.EnvironmentPlugin({
        //     NODE_ENV: 'development',
        // }),

        new webpack.LoaderOptionsPlugin({
            debug: true,
        })
    ],

    node: {
        __dirname: false,
        __filename: false
    }

}

export default config;