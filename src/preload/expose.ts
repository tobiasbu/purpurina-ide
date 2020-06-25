export default function expose(apiKey: string, api: Record<string, any>) {
  if (__PURPUR_DEV__) {
    window[apiKey] = api;
  } else {
    // contextBridge.exposeInMainWorld(apiKey, api);
  }
}
