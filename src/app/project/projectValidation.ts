import * as path from 'path';
import * as fse from 'fs-extra';

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

      const scintillaProjectPath = path.join(projectPath, path.sep, 'glitter.json');

      const p = fse.readFile(scintillaProjectPath)
        .then((buffer) => {
          const json: IProjectPackage = JSON.parse(buffer.toString('utf-8'));
          const projectInfo: IProjectInfo = {
            projectPackage: json,
            path: projectPath,
            index: indexer,
          };
          return projectInfo;
        }).catch(() => {
          const projectInfo: IProjectInfo = {
            projectPackage: null,
            error: 'Invalid project',
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

export function validateProject(projectPath: string) {
  if (fse.existsSync(projectPath)) {

    const scintillaProjectPath = path.join(projectPath, path.sep, 'glitter.json');

    fse.readFile(scintillaProjectPath)
      .then((buffer) => {
        const json = buffer.toJSON();
        console.log(json);
      });

  } else {
    Promise.reject({ projectPath, message: "Path don't exists." });
  }
}
