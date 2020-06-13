import webpack = require('webpack');

type LoggingDebugFn = (name: string) => boolean | string | RegExp;

interface ExtendedWebpackStats extends webpack.Stats.ToJsonOptionsObject {
  chunkGroups: boolean;
  colors: boolean;
  loggingDebug: string[] | RegExp | LoggingDebugFn;
  logging: 'none' | 'error' | 'warn' | 'info' | 'log' | 'verbose' | boolean;
  loggingTrace: boolean;
  outputPath: boolean;
  errorStack: boolean;
  preset: string;
}

/**
 * Webpack stats.
 * @see https://webpack.js.org/configuration/stats/
 */
const stats: ExtendedWebpackStats = {
  all: undefined,
  assets: false,
  assetsSort: '!size',
  builtAt: false,
  cached: false,
  cachedAssets: false,
  children: false,

  chunks: false,
  chunkGroups: false,
  chunkModules: false,
  chunkOrigins: false,

  colors: true,

  depth: false,
  entrypoints: false,
  env: false,

  errors: true,
  errorStack: true,
  errorDetails: true,

  // excludeAssets: () => false,
  // excludeModules: () => false,

  hash: false,

  loggingDebug: () => false,
  logging: 'info',
  loggingTrace: false,

  maxModules: 1,
  modules: false,
  moduleTrace: false,

  outputPath: false,
  performance: false,
  preset: 'minimal',
  providedExports: false,

  publicPath: false,
  reasons: false,
  source: false,
  timings: false,

  usedExports: false,
  version: false,
};

export default stats;
