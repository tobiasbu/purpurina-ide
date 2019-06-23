import FileWatcher from './FileWatcher';
import * as path from 'path';
// import { lock, LockOptions} from 'proper-lockfile';
// import { lock, Options } from 'lockfile';

// interface AdvancedLockOptions extends LockOptions {
//     /**
// tslint:disable-next-line: max-line-length
//      * Duration in milliseconds in which the lock is considered stale, defaults to 10000 (minimum value is 5000)
//      */
//     stale?: number;
//     /**
//      * Custom lockfile path. e.g.:
// tslint:disable-next-line: max-line-length
//      * If you want to lock a directory and create the lock file inside it, you can pass file as <dir path> and options.lockfilePath as <dir path>/dir.lock
//      */
//     lockfilePath?: string;
//     /**
// tslint:disable-next-line: max-line-length
//      * The interval in milliseconds in which the lockfile's mtime will be updated, defaults to stale/2 (minimum value is 1000, maximum value is stale/2).
//      */
//     update?: number;
// }

export default class ProjectManager {

  private watcher: FileWatcher;

  public constructor() {

  }

  static openProject(projectPath: string, newProject: boolean = false) {

    const pathToGlitter = path.join(projectPath, path.sep, 'glitter.json');

    // const lockFileOptions: AdvancedLockOptions = {
    //     lockfilePath: path.join(projectPath, path.sep, "dir.lock"),
    //     onCompromised: (err:Error) => {console.log(err);},
    //     update: 1000,
    // }

    return new Promise<FileWatcher>((resolve, reject) => {
      resolve(new FileWatcher());
    });

  }
}
