
import * as chokidar from 'chokidar';

export default class FileWatcher {

  private watcher: chokidar.FSWatcher;
  private isWatching: boolean;
  private isReady: boolean;

  /**
   * Constructor
   */
  constructor() {
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
      return;
    }

    const options: chokidar.WatchOptions = {
      persistent: true,
      awaitWriteFinish: true,
      cwd: location,
      ignoreInitial: true,
    };

    this.watcher = chokidar.watch('.', options);

    const log = console.log.bind(console);

    const promise = new Promise((resolve) => {
      this.watcher.once('ready', () => {
        log('Initial scan complete. Ready for changes');
        this.isReady = true;
        resolve();
      });
    });

    this.watcher
      .on('add', path => log(`File ${path} has been added`))
      .on('change', path => log(`File ${path} has been changed`))
      .on('unlink', path => log(`File ${path} has been removed`));

    // More possible events.
    this.watcher
      .on('addDir', path => log(`Directory ${path} has been added`))
      .on('unlinkDir', path => log(`Directory ${path} has been removed`))
      .on('error', error => log(`Watcher error: ${error}`))
      .on('raw', (event, path, details) => {
        log('Raw event info:', event, path, details);
      });

    this.isWatching = true;

    return promise;
  }

}
