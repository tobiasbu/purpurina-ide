import WebpackDevMiddleware = require('webpack-dev-middleware');

export interface BuildEnvironment {
  DEV?: any,
  HOT?: any
  MODE?: 'development' | 'production';
  isProduction?: boolean;
}

export interface WebpackDevMiddlewareMoreOptions extends WebpackDevMiddleware.Options {
  quiet: boolean;
  reload: boolean;
  overlay: boolean;
}