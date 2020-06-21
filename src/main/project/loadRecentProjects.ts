import * as path from 'path';
import * as fse from 'fs-extra';

import readPackage from './readPackage';

export default function loadRecentProjects(
  recentProjects: string[]
): Promise<null | Project.Metadata[]> {
  if (!recentProjects || recentProjects.length === 0) {
    return Promise.resolve(null);
  }

  const projectsPromisesFiles: Promise<Project.Metadata>[] = [];
  recentProjects.forEach((projectPath, index) => {
    if (fse.existsSync(projectPath)) {
      const purpurPackage = path.join(projectPath, path.sep, 'purpurina.json');

      const p = fse
        .readFile(purpurPackage)
        .then((buffer) => readPackage(buffer, projectPath, index))
        .catch((e) => {
          const projectInfo: Project.Metadata = {
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
