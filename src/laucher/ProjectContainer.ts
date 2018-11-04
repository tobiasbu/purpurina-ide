import hyper from "hyperhtml";
import { IProjectInfo } from "./IProjectInfo";


export default class ProjectContainer extends hyper.Component {

    private project: IProjectInfo;

    constructor(project: IProjectInfo) {
        super();
        this.project = project;
    }

    render() {
        return hyper.wire(this)`
        <div class="project-container">
                    <div class="thumbnail"></div>
                    <div class="info">
                        <p class="title">${this.project.name}</p>
                        <p>${this.project.path}</p>
                        
                    </div>
        </div>
      `;
    }
}