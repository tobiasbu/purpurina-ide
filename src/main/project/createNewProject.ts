import * as path from 'path';
import * as fse from 'fs-extra';
import { ICreateProject, IProjectInfo, IProjectPackage } from '@shared/types';

import * as PathValidation from '../../shared/utils/PathValidation';
import FileSystem from '../utils/FileSystem';
import { generatePackageJSON, generateProjectPackage } from './packageGenerator';

/**
 * Validate project creation data.
 * This function checks if the following attributes are correct:
 * - project folder name;
 * - project path;
 *
 * @param newProject Project creation data.
 * @throws When there is a error in validation.
 */
function validateNewProject(newProject: ICreateProject): void {

  let error = PathValidation.folderName(newProject.projectName);

  if (error.length !== 0) {
    throw new Error(error);
  }

  const fullPath = path.join(newProject.location, `.${path.sep}${newProject.projectName}`);

  error = PathValidation.path(fullPath);

  if (error.length !== 0) {
    throw new Error(error);
  }

}

/**
 * Creates and validates new Purpurina project directory.
 *
 * @param createProjectInfo Project creation data.
 */
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
