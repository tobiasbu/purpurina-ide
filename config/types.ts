import WebpackDevMiddleware = require('webpack-dev-middleware');
import * as http from 'http';
import webpack = require('webpack');
import { NextHandleFunction } from 'connect';

export type DevMiddleware = WebpackDevMiddleware.WebpackDevMiddleware & NextHandleFunction;

export interface CommonEnv extends NodeJS.ProcessEnv {
  readonly NODE_ENV: 'development' | 'production';
  readonly ELECTRON_WEBPACK_WDS_PORT: string;
  readonly ELECTRON_WEBPACK_WDS_HOST: string;
  /**
   * Distribution path.
   *
   * In this path, the bundled files in will be deployed.
   */
  readonly PURPUR_DIST_PATH: string;
  /**
   * Project path.
   *
   * Root path of entire project.
   */
  readonly PURPUR_PROJECT_PATH: string;
}

export interface ElectronEnv extends CommonEnv {
  readonly ELECTRON_HMR_SOCKET_PATH: string;
}

// export interface DevelopmentSettings {
//   electronSocketPath?: string;
//   readonly NODE_ENV: 'development' | 'production';
//   readonly cwd: string;
//   /**
//    *  Directory name of the directory containing the JavaScript source code file
//    */
//   readonly configPath: string;
//   /**
//    * Project path
//    */
//   readonly projectPath: string;
//   /**
//    * Distribution path.
//    */
//   readonly distPath: string;
// }

// export interface RendererServer {
//   host: string;
//   port: number;
// }

export interface WebpackBaseBuildConfig {
  readonly DIST_PATH?: string;
  readonly NODE_ENV?: 'development' | 'production';
}

export interface DevServerBuildConfig extends WebpackBaseBuildConfig {
  readonly HOST: string;
  readonly PORT: string | number;
}

export interface PurpurinaWebpackConfig extends webpack.Configuration {
  readonly PURPURINA_PROJECT_PATH: string;
}

export interface WebpackDevMiddlewareMoreOptions extends WebpackDevMiddleware.Options {
  quiet: boolean;
  reload: boolean;
  overlay: boolean;
  noInfo: boolean;
}

export interface RendererCompilation {
  stats: webpack.Stats;
  compiler: webpack.ICompiler;
}

export interface RendererServer {
  server: http.Server;
  devMiddleware: DevMiddleware;
}
