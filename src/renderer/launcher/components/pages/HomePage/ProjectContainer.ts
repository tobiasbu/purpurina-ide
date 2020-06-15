import hyper from 'hyperhtml';
import { IProjectContainer, IRecentProjectsPage } from '../../../types';

// const iconPlaceholder = require('!svg-inline-loader!../../../img/icon_star.svg') as string;
import iconPlaceholder from '../../../img/icon_star.svg';

export default class ProjectContainer extends hyper.Component
  implements IProjectContainer {
  private project: Project.Metadata;
  private parent: IRecentProjectsPage;
  private isSelected: boolean;

  public get info(): Project.Metadata {
    return this.project;
  }

  constructor(project: Project.Metadata, parent: IRecentProjectsPage) {
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
    const { projectPackage, path } = this.project;
    let name: string;
    let version: string;
    let author: string;
    let projectPath: string;
    if (!this.project.error || projectPackage != null) {
      name = projectPackage.name;
      version = projectPackage.version || '?';
      author = projectPackage.author || '';
      projectPath = path;
    } else {
      name = 'Invalid project';
      author = '';
    }
    let className = 'project-container';
    if (this.isSelected) {
      className = className.concat(' selected');
    }
    return this.html`
        <li class=${className}
        onmousedown=${(): void => {
          this.parent.selectProject(this);
        }}
        ondblclick=${(): void => {}} >
                    <div class="thumbnail">
                      <div class="inner-thumbail">
                        ${{ html: iconPlaceholder }}
                      </div>
                    </div>
                    <div class="main-info">
                        <p class="project-title">${name}</p>
                        <p>${projectPath}</p>
                    </div>
        </li>
      `;
  }
}
