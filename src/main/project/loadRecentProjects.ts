import { ProjectInfo, ProjectPackage } from '@shared/types';
import * as path from 'path';
import * as fse from 'fs-extra';

function readPackage(
  buffer: Buffer,
  projectPath: string,
  indexer: number
): ProjectInfo {
  let projectInfo: ProjectInfo | Error;
  try {
    const json: ProjectPackage = JSON.parse(buffer.toString('utf-8'));
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

export default function loadRecentProjects(
  recentProjects: string[]
): Promise<null | ProjectInfo[]> {
  if (!recentProjects) {
    return Promise.resolve(null);
  }

  if (recentProjects.length === 0) {
    return Promise.resolve(null);
  }

  const projectsPromisesFiles: Promise<ProjectInfo>[] = [];
  recentProjects.forEach((projectPath, index) => {
    if (fse.existsSync(projectPath)) {
      const purpurPackage = path.join(projectPath, path.sep, 'purpurina.json');

      const p = fse
        .readFile(purpurPackage)
        .then((buffer) => readPackage(buffer, projectPath, index))
        .catch((e) => {
          const projectInfo: ProjectInfo = {
            index,
            projectPackage: null,
            error: e,
            path: projectPath,
          };
          return projectInfo;
        });

      projectsPromisesFiles.push(p);
    }
  });

  return Promise.all(projectsPromisesFiles);
}
