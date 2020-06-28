import * as path from 'path';
import * as fse from 'fs-extra';

import ProjectManager from '@main/project/ProjectManager';

function makeDestPath(destPath: string, index: number) {
  const parsedPath = path.parse(destPath);
  const basename = `${parsedPath.name} (${index})${parsedPath.ext}`;
  return path.join(parsedPath.dir, path.sep, basename);
}

async function ensureDestinyPath(destPath: string, index = 0) {
  return new Promise<string>((resolve) => {
    fse.pathExists(destPath).then((exists) => {
      if (!exists) {
        resolve(destPath);
      } else {
        const nextIndex = index + 1;
        resolve(
          ensureDestinyPath(makeDestPath(destPath, nextIndex), nextIndex)
        );
      }
    });
  });
}

export default class Importer {
  private manager: ProjectManager;

  constructor(manager: ProjectManager) {
    this.manager = manager;
  }

  private copyFile(file: ImportData.File) {
    let sourcePath: string;
    if (typeof file === 'object') {
      sourcePath = file.path;
    }

    if (sourcePath) {
      return new Promise((resolve, reject) => {
        const originalDestPath = path.join(
          this.manager.path,
          `./${path.basename(sourcePath)}`
        );

        if (originalDestPath === sourcePath) {
          Promise.resolve();
        }

        console.log('dest', originalDestPath);
        console.log('source', sourcePath);
        ensureDestinyPath(originalDestPath).then((destPath) => {
          console.log(destPath);
          fse
            .copy(sourcePath, destPath, {
              dereference: true,
              overwrite: false,
              errorOnExist: true,
            })
            .then(resolve)
            .catch((error) => {
              reject(
                new Error(
                  `Could not import file. '${sourcePath}' does not exist.\n${error}`
                )
              );
            });
        });
      });
    }
    return Promise.resolve();
  }

  load(files: ImportData.File[] | ImportData.File) {
    let importPromise = [];
    if (Array.isArray(files)) {
      for (let i = 0; i < files.length; i += 1) {
        const promise = this.copyFile(files[i]);
        importPromise.push(promise);
      }
    }
    return Promise.allSettled(importPromise);
  }
}
