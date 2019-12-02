import webpack = require("webpack");

type LoggingDebugFn = (name: string) => boolean | string | RegExp;

interface ExtendedStats extends webpack.Stats.ToJsonOptionsObject {
  chunkGroups: boolean,
  colors: boolean,
  loggingDebug: string[] | RegExp | LoggingDebugFn;
  logging: 'none' | 'error' | 'warn' | 'info' | 'log' | 'verbose' | boolean;
  loggingTrace: boolean;
  outputPath: boolean;
}

/**
 * Webpack stats.
 * @see https://webpack.js.org/configuration/stats/
 */
const stats: ExtendedStats = {
  all: false,
  assets: false,
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
  errorDetails: true,

  excludeAssets: () => false,
  excludeModules: () => false,

  hash: false,

  loggingDebug: () => false,
  logging: 'info',
  loggingTrace: false,

  maxModules: 1,
  modules: false,
  moduleTrace: false,

  outputPath: false,
  performance: false,
  providedExports: false,

  publicPath: false,
  reasons: false,
  source: false,
  timings: false,

  usedExports: false,
  version: false,
};

export default stats;
