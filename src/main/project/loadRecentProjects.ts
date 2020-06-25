import * as fse from 'fs-extra';

import loadMetadata from './loadMetadata';

export default function loadRecentProjects(
  recentProjects: string[]
): Promise<null | Project.Metadata[]> {
  if (!recentProjects || recentProjects.length === 0) {
    return Promise.resolve(null);
  }

  const projectsPromisesFiles: Promise<Project.Metadata>[] = [];
  recentProjects.forEach((projectPath, index) => {
    if (fse.existsSync(projectPath)) {
      const p = loadMetadata(projectPath);
      projectsPromisesFiles.push(p);
    }
  });

  return Promise.all(projectsPromisesFiles);
}
