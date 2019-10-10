import hyper from 'hyperhtml';

import { IProjectInfo } from 'shared/types';
import ProjectsPage from '../pages/ProjectsPage';

const iconPlaceholder = require('!svg-inline-loader!../img/icon_star.svg') as string;

// function parseThumbail(thumbail: string) {

//     if ((value as string).substr(0, 3).toLowerCase() === 'rgb') {
//         return CSSToColor(value, source);
//       } else {
//         return HexToColor(value, source);
//       }
// }

export default class ProjectContainer extends hyper.Component {

  private project: IProjectInfo;
  private parent: ProjectsPage;
  private isSelected: boolean;
  // private onSelection: (e:MouseEvent) => void;

  public get info(): IProjectInfo {
    return this.project;
  }

  constructor(project: IProjectInfo, parent: ProjectsPage) {
    super();
    this.project = project;
    this.parent = parent;
    this.isSelected = false;
    // this.onSelection = this.parent.selectProject.bind(parent, this);
  }

  public setSelection(flag: boolean): any {
    this.isSelected = flag;
    this.render();
  }

  render() {
    const { projectPackage, path } = this.project;
    let name;
    let version;
    let author: string;
    if (!this.project.error) {
      name = projectPackage.name;
      version = projectPackage.version || '?';
      author = projectPackage.author || '';
    } else {
      name = 'Invalid project';
      console.log(this.project.error);
      author = this.project.error;
    }
    // const style = `background-color:${this.project.thumbnail}`;
    let className = 'project-container';
    if (this.isSelected) {
      className = className.concat(' selected');
    }
    return hyper.wire(this)`
        <li class=${className}
        onmousedown=${() => { this.parent.selectProject(this); }}
        ondblclick=${() => { this.parent.openProject(this); }} >
                    <div class="thumbnail">
                      <div class="inner-thumbail">
                        ${{ html: iconPlaceholder }}
                      </div>
                    </div>
                    <div class="info">
                        <p class="project-title">${name}</p>
                        <p>${path}</p>
                        <p>${author} - ${version}</p>
                    </div>
        </li>
      `;
  }
}
