import type WebpackDevMiddleware from 'webpack-dev-middleware';
import type webpack from 'webpack';

export interface DevServerConfig {
  /**
   * Renderer dev server port
   */
  readonly ELECTRON_WEBPACK_WDS_PORT: string;
  /**
   * Renderer dev server host
   */
  readonly ELECTRON_WEBPACK_WDS_HOST: string;
}

/**
 * Base Environmental configuration
 */
export interface BaseEnvironmentConfig extends DevServerConfig {
  /**
   * Distribution path.
   *
   * In this path, the bundled files will be deployed.
   */
  readonly PURPUR_DIST_PATH: string;
  /**
   * Project path.
   *
   * Root path of entire project.
   */
  readonly PURPUR_PROJECT_PATH: string;
  /**
   * Environment build
   */
  readonly NODE_ENV?: 'development' | 'production';
}

// ENVIRONMENT CONFIGURATIONS

export type EnvironmentConfig = NodeJS.ProcessEnv & BaseEnvironmentConfig;
export type ElectronRendererEnv = EnvironmentConfig & DevServerConfig;

export interface ElectronMainEnv extends EnvironmentConfig {
  /**
   * Hot module replacement socket path
   */
  readonly ELECTRON_HMR_SOCKET_PATH: string;
  /**
   * Hot module replacement socket id
   */
  readonly ELECTRON_HMR_SOCKET_ID: string;
}

// DEVELOPER SERVER CONFIGURATION

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
