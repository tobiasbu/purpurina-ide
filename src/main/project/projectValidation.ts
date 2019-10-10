import { IProjectInfo, IProjectPackage } from '@shared/types';
import * as path from 'path';
import * as fse from 'fs-extra';

function readPackage(buffer: Buffer, projectPath: string, indexer: number) {
  let projectInfo: IProjectInfo | Error;
  try {
    const json: IProjectPackage = JSON.parse(buffer.toString('utf-8'));
    projectInfo = {
      projectPackage: json,
      path: projectPath,
      index: indexer,
    };
  } catch (e) {
    throw new Error(`Could not read package: ${e}`);
  }
  return projectInfo;
}

export function loadRecentProjects(recentProjects: string[]): Promise<null | IProjectInfo[]> {

  if (!recentProjects) {
    return Promise.resolve(null);
  }

  if (recentProjects.length === 0) {
    return Promise.resolve(null);
  }

  const projectsPromisesFiles: Promise<IProjectInfo>[] = [];
  let indexer: number = 0;

  for (const projectPath of recentProjects) {

    if (fse.existsSync(projectPath)) {

      const purpurPackage = path.join(projectPath, path.sep, 'purpurina.json');

      const p = fse.readFile(purpurPackage)
        .then(buffer => readPackage(buffer, projectPath, indexer))
        .catch((e) => {
          const projectInfo: IProjectInfo = {
            projectPackage: null,
            error: e,
            path: projectPath,
            index: indexer,
          };
          return projectInfo;
        });

      projectsPromisesFiles.push(p);
      indexer += 1;
    }
  }
  return Promise.all(projectsPromisesFiles);
}
