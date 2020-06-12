import * as chokidar from 'chokidar';
import Logger from '../logger';

/**
 * File Watcher system.
 */
export default class FileWatcher {
  private watcher: chokidar.FSWatcher;
  private isWatching: boolean;
  private location: string;
  public isReady: boolean;

  /**
   * Constructor
   */
  constructor(location: string) {
    this.location = location;
    this.isWatching = false;
    this.isReady = false;
  }

  /**
   * Start to watch the project file system
   * @param location Project location
   * @return A promise with project file structure
   */
  start(location: string): Promise<{}> {
    if (this.isWatching) {
      return null;
    }

    const options: chokidar.WatchOptions = {
      persistent: true,
      awaitWriteFinish: true,
      cwd: location,
      ignoreInitial: false,
      alwaysStat: true,
    };

    this.watcher = chokidar.watch('.', options);

    // const log = console.log.bind(console);

    const promise = new Promise((resolve) => {
      this.watcher.once('ready', () => {
        Logger.log('Initial scan complete. Ready for changes');
        this.isReady = true;
        resolve();
      });
    });

    this.watcher
      .on('add', (path, stats) =>
        Logger.log(`File ${path} has been added`, JSON.stringify(stats))
      )
      .on('change', (path) => Logger.log(`File ${path} has been changed`))
      .on('unlink', (path) => Logger.log(`File ${path} has been removed`));

    // More possible events.
    this.watcher
      .on('addDir', (path) => Logger.log(`Directory ${path} has been added`))
      .on('unlinkDir', (path) =>
        Logger.log(`Directory ${path} has been removed`)
      )
      .on('error', (error) => Logger.error(`Watcher error: ${error}`))
      .on('raw', (event, path, details) => {
        Logger.log('Raw event info:', event, path, details);
      });

    this.isWatching = true;

    return promise;
  }
}
