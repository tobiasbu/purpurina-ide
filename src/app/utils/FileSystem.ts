import * as fs from 'fs';
import * as path from 'path';

const _0777 = parseInt('0777', 8);

class FileSystem {

    static isEmptyDiretory(dirname: string) {
        const files = fs.readdirSync(dirname);
        if (files.length === 0) {
            return true;
        } else {
            return false;
        }
    }

    static mkdirpSync(dirname: string, options?: { mode?: number }) {
        if (!options || typeof options !== 'object') {
            options = { mode: _0777 };
        }

        let mode = options.mode;

        if (mode === undefined) {
            mode = _0777 & (~process.umask());
        }
        const splitedDir = dirname.split(path.sep);
        const baseDir = path.isAbsolute(dirname) ? path.sep : '.';
        // const initValue = path.isAbsolute(dirname) ? 

        console.log(splitedDir)

        return splitedDir.reduce((previousValue, currentValue) => {

            const curDir = path.resolve(baseDir, previousValue, currentValue);
            try {
                fs.mkdirSync(curDir, mode);
            } catch (err) {
                switch(err.code) {
                    case 'EEXIST': { // already exists!
                        return curDir;
                    }
                    case 'ENOENT': {
                        throw new Error(err);
                    }
                    default: {
                        const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
                        if (!caughtErr || caughtErr && curDir === path.resolve(dirname)) {
                            throw err;
                        }
                    }
                }
            }

            return curDir;

        });

        
    }

}

export default FileSystem;