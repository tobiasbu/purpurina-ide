export default function readPackage(
  buffer: Buffer,
  projectPath: string,
  indexer: number
): Project.Metadata {
  let projectInfo: Project.Metadata | Error;
  try {
    const json: Project.Package = JSON.parse(buffer.toString('utf-8'));
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
