import WebpackDevMiddleware = require('webpack-dev-middleware');
import * as http from 'http';

export interface BuildEnvironment {
  DEV?: any,
  HOT?: any
  mode?: 'development' | 'production';
  isProduction?: boolean;
}

export interface WebpackDevMiddlewareMoreOptions extends WebpackDevMiddleware.Options {
  quiet: boolean;
  reload: boolean;
  overlay: boolean;
  noInfo: boolean;
}

export interface RendererServer {
  server: http.Server;
  port: number;
}
