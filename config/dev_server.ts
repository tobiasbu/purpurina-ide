
import * as express from 'express';
import * as webpack from 'webpack';
import * as path from 'path';
// import * as https from 'https';

import * as WebpackDevMiddleware from 'webpack-dev-middleware';
import * as WebpackHotMiddleware from 'webpack-hot-middleware';

import config from './webpack.config.renderer.dev';
import { spawn } from 'child_process';

const PORT = 8080;
const PATH = path.join(__dirname, '../dist');

// webpack
const compiler = webpack(config);

interface MidOptions extends WebpackDevMiddleware.Options {
    quiet: boolean,
    reload: boolean,
    overlay: boolean
}

const devOptions: MidOptions = {
    publicPath: config.output.publicPath,
    quiet: false,
    reload: true,
    overlay: true,
    writeToDisk: true
}

const devMiddleware = WebpackDevMiddleware(compiler, devOptions);
var hotMiddleware = WebpackHotMiddleware(compiler);

// Server configuring
const expressApp = express();

expressApp.use(devMiddleware);
expressApp.use(hotMiddleware);

expressApp.use(express.static(PATH));

// const server = http.createServer(expressApp);



const server = expressApp.listen(PORT, 'localhost', (error) => {

    if (error) {
        return console.error(error);
    }

    spawn('npm', ['run', 'start-electron'], {
        shell: true,
        env: process.env,
        stdio: 'inherit'
      })
        .on('close', code => process.exit(code))
        .on('error', spawnError => console.error(spawnError));
    

    console.log('\nDev server listening on port ' + PORT + '\n');
})

process.on('SIGTERM', () => {
    console.log('Stopping dev server');
    devMiddleware.close();
    server.close(() => {
        process.exit(0);
    });
});