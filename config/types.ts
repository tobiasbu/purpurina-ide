import WebpackDevMiddleware = require('webpack-dev-middleware');
import * as http from 'http';
import webpack = require('webpack');
import { NextHandleFunction } from 'connect';

export type DevMiddleware = WebpackDevMiddleware.WebpackDevMiddleware & NextHandleFunction;

export interface BuildEnvironment {
  DEV?: boolean;
  HOT?: boolean;
  mode?: 'development' | 'production';
  isProduction?: boolean;
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
  port: number;
  devMiddleware: DevMiddleware;
}
