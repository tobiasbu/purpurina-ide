import HmrClient from './HmrClient';

const socketPath = process.env.ELECTRON_HMR_SOCKET_PATH!;
if (socketPath === null) {
  throw new Error(`[HMR] Environment variable 'ELECTRON_HMR_SOCKET_PATH' is not set.`)
}

const socketId = process.env.ELECTRON_HMR_SOCKET_ID!;
if (socketId === null) {
  throw new Error(`[HMR] Environment variable 'ELECTRON_HMR_SOCKET_ID' is not set.`)
}

const hot = module.exports.hot as __WebpackModuleApi.Hot;

const hmrClient = new HmrClient(hot);

hmrClient.connect(socketPath, socketId)
  .then(() => {
    // TODO
  });

