import WebpackDevMiddleware = require('webpack-dev-middleware');
import * as http from 'http';
import webpack = require('webpack');
import { NextHandleFunction } from 'connect';

export type DevMiddleware = WebpackDevMiddleware.WebpackDevMiddleware & NextHandleFunction;

export interface DevelopmentEnvironment {
  readonly NODE_ENV: 'development' | 'production';
  readonly cwd: string;
  /**
   *  Directory name of the directory containing the JavaScript source code file
   */
  readonly configPath: string;
  /**
   * Project path
   */
  readonly projectPath: string;
  /**
   * Distribution path.
   */
  readonly distPath: string;
  /**
   * Renderer
   */
  readonly renderer: RendererEnv;
}

export interface RendererEnv {
  host: string;
  port: number;
}

export interface WebpackBuildConfig {
  readonly projectPath: string;
  readonly distPath: string;
  readonly host: string;
  readonly port: string | number;
  readonly isProduction: boolean;
  mode?: 'development' | 'production';
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
