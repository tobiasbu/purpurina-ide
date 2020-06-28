import { type } from 'os';

interface IContextApplication {
  start();
  clear();
}

type ContextMap = Map<string, IContextApplication>;

class ContextOrchestrator {
  private contextMap: ContextMap;
  private context: IContextApplication;
  constructor() {
    this.contextMap = new Map();
    this.context = null;
  }
}
