import hyper from 'hyperhtml';

import { IProjectInfo } from 'shared/types';
import RecentProjectsPage from './RecentProjectsPage';

const iconPlaceholder = require('!svg-inline-loader!../../../img/icon_star.svg') as string;

export default class ProjectContainer extends hyper.Component {

  private project: IProjectInfo;
  private parent: RecentProjectsPage;
  private isSelected: boolean;

  public get info(): IProjectInfo {
    return this.project;
  }

  constructor(project: IProjectInfo, parent: RecentProjectsPage) {
    super();
    this.project = project;
    this.parent = parent;
    this.isSelected = false;
  }

  public setSelection(flag: boolean): any {
    this.isSelected = flag;
    this.render();
  }

  render() {
    // const { projectPackage, path } = this.project;
    // let name: string;
    // let version: string;
    // let author: string;
    // if (!this.project.error || projectPackage != null) {
    //   name = projectPackage.name;
    //   version = projectPackage.version || '?';
    //   author = projectPackage.author || '';
    // } else {
    //   name = 'Invalid project';
    //   author = '';
    // }
    const name = 'Invalid project';
    const path = 'any';
    let className = 'project-container';
    if (this.isSelected) {
      className = className.concat(' selected');
    }
    return this.html`
        <li class=${className}
        onmousedown=${() => { this.parent.selectProject(this); }}
        ondblclick=${() => { this.parent.openProject(this); }} >
                    <div class="thumbnail">
                      <div class="inner-thumbail">
                        ${{ html: iconPlaceholder }}
                      </div>
                    </div>
                    <div class="main-info">
                        <p class="project-title">${name}</p>
                        <p>${path}</p>
                    </div>
        </li>
      `;
  }
}
