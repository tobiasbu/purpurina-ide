import * as path from 'path';
import * as fse from 'fs-extra';
import PathValidate from '../../shared/utils/pathValidation';
import FileSystem from '../utils/FileSystem';
import { generatePackageJSON, generateProjectPackage } from './package';
import { ICreateProject, IProjectInfo, IProjectPackage } from '../../shared/typings';


const ProjectManagement = {

    loadRecentProjects(recentProjects: string[]): Promise<null | IProjectInfo[]> {

        if (!recentProjects) {
            return Promise.resolve(null);
        }

        if (recentProjects.length === 0) {
            return Promise.resolve(null);
        }


        const projectsPromisesFiles: Promise<IProjectInfo>[] = [];

        for (const projectPath of recentProjects) {

            if (fse.existsSync(projectPath)) {

                const scintillaProjectPath = path.join(projectPath, path.sep, 'glitter.json');

                const p = fse.readFile(scintillaProjectPath)
                    .then((buffer) => {
                        let json: IProjectPackage = JSON.parse(buffer.toString('utf-8'));
                        let projectInfo: IProjectInfo = {
                            projectPackage: json,
                            path: projectPath
                        }
                        return projectInfo;
                    }).catch(() => {
                        let projectInfo: IProjectInfo = {
                            projectPackage: null,
                            error: 'Invalid project',
                            path: projectPath,
                        }
                        return projectInfo;
                    })

                projectsPromisesFiles.push(p);
            }
        }
        return Promise.all(projectsPromisesFiles);
    },

    validateProject(projectPath: string) {
        if (fse.existsSync(projectPath)) {

            const scintillaProjectPath = path.join(projectPath, path.sep, 'glitter.json');

            fse.promises.readFile(scintillaProjectPath)
                .then((buffer) => {
                    const json = buffer.toJSON();
                    console.log(json);
                });

        } else {
            Promise.reject({ projectPath, message: `Path don't exists.` });
        }
    },

    openProject(project: string, newProject: boolean = false) {

        if (newProject) {



        } else {

        }

    },

    validateNewProject(newProject: ICreateProject): void {

        const fullPath = path.join(newProject.location, '.' + path.sep + newProject.projectName);

        let error = PathValidate.folderName(newProject.projectName);

        if (error.length !== 0) {
            throw new Error(error);
        }

        error = PathValidate.path(fullPath)

        if (error.length !== 0) {
            throw new Error(error);
        }

    },

    createNewProject(createProjectInfo: ICreateProject): IProjectInfo {

        ProjectManagement.validateNewProject(createProjectInfo);

        const fullPath = path.join(createProjectInfo.location, '.' + path.sep + createProjectInfo.projectName);

        

        if (fse.existsSync(fullPath)) {

            try {
                fse.accessSync(createProjectInfo.location)
            } catch (err) {
                throw new Error(`No access permision for the location '${createProjectInfo.location}'. Try another path.`);
            }

            if (!FileSystem.isEmptyDiretory(fullPath)) {
                throw new Error(`The location '${fullPath}' is already in use and not empty.`);
            }
        } else {
            try {
                FileSystem.mkdirpSync(fullPath)
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
            path: fullPath
        }

        return projectInfo;

    }

};

export default ProjectManagement;