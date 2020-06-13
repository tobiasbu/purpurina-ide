import { Stats } from 'webpack';

export enum ConnectionStatus {
  None,
  Connecting,
  Connected,
}

export interface HmrServer {
  readonly socketPath: string;
  readonly socketId: string;
  onBeforeCompile(): void;
  onCompiled(stats: Stats): void;
  isListening(): boolean;
  listen(): Promise<HmrServer>;
}
