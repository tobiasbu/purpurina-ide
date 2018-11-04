import hyper from "hyperhtml";
import { IProjectInfo } from "./IProjectInfo";
import ProjectContainer from "./ProjectContainer";


export default class ProjectListPage extends hyper.Component {

    private projectsElements: ProjectContainer[] = [];

    setup(projects: IProjectInfo[]) {
        projects.forEach(element => {
            this.projectsElements.push(new ProjectContainer(element));
        });

        this.render();
    }

    render() {
        return hyper.wire(this)`
      <div class='container'>
      ${
            this.projectsElements
        }
      </div>
      `
            ;
    }
}