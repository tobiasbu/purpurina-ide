import hyper from 'hyperhtml';
import ProjectContainer from '../components/ProjectContainer';
import { ipcRenderer } from 'electron';

export default class HomePage extends hyper.Component {

  private projectsElements: ProjectContainer[];
  private selectedProject: ProjectContainer = null;

  private welcomePage() {
    return hyper.wire()`
            <h2>Welcome to Glitter!</h2>
            <p>Click on "New Project" button to create a something new.</p>
            <p>Or click the "Open Project" button to load a project and continue working.</p>
            <p>Your recent work will appear here next time.</p>
            `;
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

  public setup(projects: IProjectInfo[]) {

    if (!projects || projects.length === 0) {
      this.projectsElements = null;
    } else {

      this.projectsElements = [];
      projects.forEach((element) => {
        this.projectsElements.push(new ProjectContainer(element, this));
      });

    }

    this.render();
  }

  private render() {

    return hyper.wire(this)`
      <div class='home-page'>
        ${ !this.projectsElements ? this.welcomePage() : this.projectsElements}
      </div>
      `
      ;
  }
}
