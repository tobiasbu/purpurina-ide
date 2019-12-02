import { ProjectInfo } from '@shared/types';

import FileWatcher from '../systems/FileWatcher';

/**
 * Controls the project systems.
 */
export default class ProjectManager {
  private metadata: ProjectInfo;
  isReady: boolean;
  watcher: FileWatcher;

  /**
   * Get project path.
   */
  public get path(): string {
    return this.metadata.path;
  }

  public constructor(projectInfo: ProjectInfo) {
    this.metadata = projectInfo;
    this.isReady = false;
  }

  static openProject(projectInfo: ProjectInfo): Promise<ProjectManager> {
    return new Promise<ProjectManager>((resolve, reject) => {
      const manager = new ProjectManager(projectInfo);
      // Starting systems
      const watcher = new FileWatcher(projectInfo.path);
      watcher.start(manager.metadata.path)
        .then(() => {
          manager.watcher = watcher;
          manager.isReady = true;
          resolve(manager);
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  }

  // public send(message: string, payload: IMessage): void {

  // }
}
