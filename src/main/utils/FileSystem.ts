import * as fse from 'fs-extra';
import * as path from 'path';

const OCT_0777 = 0o0777; // parseInt('0777', 8);;
/**
 * Verify if given directory path is empty.
 * @param dirname Directory path.
 */
export function isEmpty(dirname: string): boolean {
  const files = fse.readdirSync(dirname);
  if (files.length === 0) {
    return true;
  }
  return false;
}

export function mkdirpSync(
  dirname: string,
  options?: { mode?: number }
): string {
  let opt = options;
  if (!options || typeof options !== 'object') {
    opt = { mode: OCT_0777 };
  }
  let { mode } = opt;
  if (mode === undefined) {
    // @ts-ignore
    mode = OCT_0777 & ~process.umask();
  }
  const splitedDir = dirname.split(path.sep);
  const baseDir = path.isAbsolute(dirname) ? path.sep : '.';
  // const initValue = path.isAbsolute(dirname) ?

  return splitedDir.reduce((previousValue, currentValue) => {
    const curDir = path.resolve(baseDir, previousValue, currentValue);
    try {
      fse.mkdirSync(curDir, mode);
    } catch (err) {
      switch (err.code) {
        case 'EEXIST': {
          // already exists!
          return curDir;
        }
        case 'ENOENT': {
          throw new Error(err);
        }
        default: {
          const caughtErr =
            ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
          if (!caughtErr || (caughtErr && curDir === path.resolve(dirname))) {
            throw err;
          }
        }
      }
    }

    return curDir;
  });
}

export async function isDirectory(path: string): Promise<boolean> {
  const stats = await fse.lstat(path);
  return stats.isDirectory();
}
