import * as fs from 'fs';
import * as path from 'path';
import { IProjectInfo, ICreateProject, IProjectPackage } from '../../shared/typings';
import version from '../version';

const PACKAGE_NAME_VALIDATION = /^(?:@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/

interface PackageJSON {
    name: string;
    version?: string,
    description?: string,
    keywords?: string[],
    author?: string,
    license?: string
}

export function generatePackageJSON(dir: string, createProject: ICreateProject): void {

    // https://docs.npmjs.com/files/package.json
    let name = createProject.projectName;

    name = name.toLowerCase();
    name = name.trim();

    if (!PACKAGE_NAME_VALIDATION.test(name)) {

        name = name.replace(/ /g,'')

        if (name.startsWith('.')) {
           name = 'dot' + name.slice(1);
        } else if (name.startsWith('_')) {
           name = 'undescore' + name.slice(1);
        } 
    }

    const json: PackageJSON = {
        name,
        author: createProject.author,
        version: "1.0.0",
        license: 'ISC',
        description: (createProject.author) ? `New Scintilla project by ${createProject.author}` : 'New Scintilla project',
        keywords: ['scintilla', 'project', 'game'],
    }


    fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify(json, null, '\t'))
   
}

export function generateProjectPackage(dir: string, createProject: ICreateProject): IProjectPackage {

    const json: IProjectPackage = {
        name: createProject.projectName,
        author: createProject.author,
        version: version.toString(),
        thumbnail: '#fff'
    }

    fs.writeFileSync(path.join(dir, 'scintilla.json'), JSON.stringify(json, null, '\t'));
    return json;

}

