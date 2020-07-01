import { BrowserWindow } from 'electron';

interface ContextWindowCreationOptions {}




abstract class ContextApplication {
  readonly window: ContextWindowService;
  readonly ipc;

  constructor() {
    this.ipc = {};
    this.window = new ContextWindowService();
  }
  abstract start(): void;
  abstract end(): void;
}

type ContextMap = Map<string, ContextApplication>;

class ContextOrchestrator {
  private contextMap: ContextMap;
  private context: ContextApplication;
  constructor() {
    this.contextMap = new Map();
    this.context = null;
  }
}
