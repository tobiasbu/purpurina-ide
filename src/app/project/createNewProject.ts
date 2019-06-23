import * as path from 'path';
import * as fse from 'fs-extra';
import pathValidation from '../../shared/utils/pathValidation';
import FileSystem from '../utils/FileSystem';
import { generatePackageJSON, generateProjectPackage } from './packageGenerator';
// import { ICreateProject, IProjectInfo, IProjectPackage } from '../../shared/types';

function validateNewProject(newProject: ICreateProject): void {

  let error = pathValidation.folderName(newProject.projectName);

  if (error.length !== 0) {
    throw new Error(error);
  }

  const fullPath = path.join(newProject.location, `.${path.sep}${newProject.projectName}`);

  error = pathValidation.path(fullPath);

  if (error.length !== 0) {
    throw new Error(error);
  }

}

export default function createNewProject(createProjectInfo: ICreateProject): IProjectInfo {

  validateNewProject(createProjectInfo);

  const fullPath = path.join(
    createProjectInfo.location, `.${path.sep}${createProjectInfo.projectName}`);

  if (fse.existsSync(fullPath)) {

    try {
      fse.accessSync(createProjectInfo.location);
    } catch (err) {
      throw new Error(`No access permission for the location '${createProjectInfo.location}'.
       Try another path.`);
    }

    if (!FileSystem.isEmptyDirectory(fullPath)) {
      throw new Error(`The location '${fullPath}' is already in use and not empty.`);
    }
  } else {
    try {
      FileSystem.mkdirpSync(fullPath);
    } catch (e) {
      throw new Error(`${e}`);
    }
  }

  let projectPackage: IProjectPackage;

  try {
    generatePackageJSON(fullPath, createProjectInfo);
    projectPackage = generateProjectPackage(fullPath, createProjectInfo);

    try {
      fse.copySync('./resources/template/project', fullPath);
    } catch (err) {
      // just ignore the error
    }

    fse.mkdirSync(path.join(fullPath, 'assets'));

  } catch (e) {
    throw new Error(`Could not initialize new project\n${e}`);
  }

  const projectInfo: IProjectInfo = {
    projectPackage,
    path: fullPath,
    index: -1,
  };

  return projectInfo;

}
