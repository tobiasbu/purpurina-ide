import path from 'path';
import webpack from 'webpack';
import type { WebpackBaseBuildConfig } from './types';

interface GenerationDllOptions {
  libs: string[];
  outputPath: string;
}

export default function generateWebpackDll(
  env: WebpackBaseBuildConfig,
  options: GenerationDllOptions
) {
  const mode = env.NODE_ENV ?? 'development';

  // const outputPath = path.join(__dirname, 'dist');
  // const libs = ['stack-trace', 'minimist', 'node-ipc'];

  const config: webpack.Configuration = {
    mode,
    context: process.cwd(),
    entry: {
      dependencies: options.libs,
    },
    output: {
      filename: '[name].dll.js',
      path: options.outputPath,
      library: '[name]',
    },
    plugins: [
      new webpack.DllPlugin({
        context: __dirname,
        name: '[name]',
        path: path.join(env.DIST_PATH, '[name].dll.manifest.json'),
      }),
    ],
  };
}
