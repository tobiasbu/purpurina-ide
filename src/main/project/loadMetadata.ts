import * as fse from 'fs-extra';
import * as path from 'path';

export function readProjectPackage(
  buffer: Buffer,
  projectPath: string
): Project.Metadata {
  let projectInfo: Project.Metadata | Error;
  try {
    const json: Project.Package = JSON.parse(buffer.toString('utf-8'));
    projectInfo = {
      projectPackage: json,
      path: projectPath,
    };
  } catch (e) {
    throw new Error(`Could not read package: ${e}`);
  }
  return projectInfo;
}

export default function loadMetadata(
  projectPath: string
): Promise<Project.Metadata> {
  if (fse.existsSync(projectPath)) {
    const purpurPackage = path.join(projectPath, path.sep, 'purpurina.json');

    return fse
      .readFile(purpurPackage)
      .then((buffer) => readProjectPackage(buffer, projectPath))
      .catch((e) => {
        const projectInfo: Project.Metadata = {
          projectPackage: null,
          error: e,
          path: projectPath,
        };
        return projectInfo;
      });
  }
  return Promise.resolve({
    projectPackage: null,
    error: 'Project path does not exist.',
    path: projectPath,
  });
}
