
import * as webpack from 'webpack';
import * as path from 'path';
import * as merge from 'webpack-merge';

import baseConfig, { Enviroment, PROJECT_PATH } from './webpack.config.base';

const packageJson = require('./../package.json');


const DIST_PATH = path.join(PROJECT_PATH, './dist/dll')
// const ENTRY_PATH = './src/renderer';

import Renderer from './webpack.config.renderer.dev';

export default (env: Enviroment) => {

    console.log("*** " + DIST_PATH)

    const config: webpack.Configuration = {
        context: PROJECT_PATH,

        devtool: 'eval',

        mode: 'development',

        target: 'electron-renderer',

        externals: ['fsevents', 'crypto-browserify'],

        module: Renderer.module,
        entry: {
            renderer: Object.keys(packageJson.dependencies || {}).filter(
                dependency => dependency !== '@fortawesome/fontawesome-free'
            )

        },

        output: {
            library: 'renderer',
            path: DIST_PATH,
            filename: '[name].dev.dll.js',
            libraryTarget: 'var'
        },

        resolve: {
            extensions: ['ts', '.js', '.json'],
            modules: [path.join(__dirname, 'app'), 'node_modules']
        },
        
        plugins: [
            new webpack.DllPlugin({
                path: path.join(DIST_PATH, '[name].json'),
                name: '[name]'
            }),
            new webpack.EnvironmentPlugin({
                NODE_ENV: 'development'
            }),
            new webpack.LoaderOptionsPlugin({
                debug: true,
                options: {
                    context: path.resolve(PROJECT_PATH, 'src'),
                    output: {
                        path: DIST_PATH
                    }
                }
            })
        ]
    }

    return merge(baseConfig, config);
}