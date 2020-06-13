import WebpackDevMiddleware = require('webpack-dev-middleware');
import * as http from 'http';
import webpack = require('webpack');
import { NextHandleFunction } from 'connect';

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
  readonly ELECTRON_HMR_SOCKET_ID: string;
}

export interface WebpackBaseBuildConfig {
  readonly DIST_PATH?: string;
  readonly NODE_ENV?: 'development' | 'production';
}

export interface DevServerBuildConfig extends WebpackBaseBuildConfig {
  readonly HOST: string;
  readonly PORT: string | number;
}

export interface WebpackDevMiddlewareMoreOptions
  extends WebpackDevMiddleware.Options {
  quiet: boolean;
  reload: boolean;
  overlay: boolean;
  noInfo: boolean;
}

export interface RendererCompilation {
  stats: webpack.Stats;
  compiler: webpack.ICompiler;
}

export namespace IPCMessage {
  export interface CompiledMessage {
    readonly hash: string;
  }
}
