import type { ContextHandlers } from '@main/contextualizer';
// import EditorSettings from './EditorSettings';

export default function ({ ipc, window }: ContextHandlers): Callback {
  return () => {
    // EditorSettings.dispose();
  };
}
