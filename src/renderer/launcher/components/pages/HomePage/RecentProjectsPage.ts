import hyper from 'hyperhtml';

import { isValid } from '@shared/utils';
import { IProjectContainer } from '../../../types';
import ProjectContainer from './ProjectContainer';

export default class RecentProjectsPage extends hyper.Component {
  private projectsElements: IProjectContainer[];
  private selectedProject: IProjectContainer = null;

  constructor(projects: Project.Metadata[]) {
    super();
    if (!isValid(projects) || projects.length === 0) {
      this.projectsElements = null;
    } else {
      this.projectsElements = [];
      projects.forEach((element) => {
        this.projectsElements.push(new ProjectContainer(element, this));
      });
    }
  }

  public selectProject(project: IProjectContainer): void {
    const oldSelection = this.selectedProject;

    if (oldSelection === project) {
      return;
    }

    if (oldSelection != null) {
      oldSelection.setSelection(false);
    }

    this.selectedProject = project;
    project.setSelection(true);
  }

  render(): HTMLElement {
    const projectElements = this.projectsElements;
    if (!isValid(projectElements)) {
      return null;
    }
    return this.html`
      <div class="project-list">
        <ul>
          ${projectElements}
        </ul>
      </div>
    `;
  }
}
