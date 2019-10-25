import hyper from 'hyperhtml';
import { isValid } from 'shared/utils';
import { ipcRenderer } from 'electron';
import { IProjectInfo } from 'shared/types';

import ProjectContainer from './ProjectContainer';

export default class RecentProjectsPage extends hyper.Component {

  private projectsElements: ProjectContainer[];
  private selectedProject: ProjectContainer = null;

  constructor(projects: IProjectInfo[]) {
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

  public selectProject(project: ProjectContainer) {

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

  public openProject(project: ProjectContainer) {
    ipcRenderer.send('launcher_openProject', project.info);
  }

  render() {

    const projectElements = this.projectsElements;

    console.log(projectElements);

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
