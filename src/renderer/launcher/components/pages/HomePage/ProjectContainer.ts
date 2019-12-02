import hyper from 'hyperhtml';
import { ProjectInfo } from '@shared/types';
import { IProjectContainer, IRecentProjectsPage } from '../../../types';

// const iconPlaceholder = require('!svg-inline-loader!../../../img/icon_star.svg') as string;
import iconPlaceholder from '../../../img/icon_star.svg';

export default class ProjectContainer extends hyper.Component implements IProjectContainer {
  private project: ProjectInfo;
  private parent: IRecentProjectsPage;
  private isSelected: boolean;

  public get info(): ProjectInfo {
    return this.project;
  }

  constructor(project: ProjectInfo, parent: IRecentProjectsPage) {
    super();
    this.project = project;
    this.parent = parent;
    this.isSelected = false;
  }

  public setSelection(flag: boolean): any {
    this.isSelected = flag;
    this.render();
  }

  render(): HTMLElement {
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
        onmousedown=${(): void => { this.parent.selectProject(this); }}
        ondblclick=${(): void => { }} >
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
