import hyper from "hyperhtml";
import { IProjectInfo } from "../../shared/typings";


// function parseThumbail(thumbail: string) {


//     if ((value as string).substr(0, 3).toLowerCase() === 'rgb') {
//         return CSSToColor(value, source);
//       } else {
//         return HexToColor(value, source);
//       }
// }

export default class ProjectContainer extends hyper.Component {

    private project: IProjectInfo;

    constructor(project: IProjectInfo) {
        super();
        this.project = project;
    }

    render() {
        const { projectPackage, path } = this.project;
        const { name, author, version } = projectPackage;
        // const style = `background-color:${this.project.thumbnail}`;
        return hyper.wire(this)`
        <div class="project-container">
                    <div class="thumbnail"></div>
                    <div class="info">
                        <p class="title">${name}</p>
                        <p>${path}</p>
                        <p>${author} | v${version}</p>
                    </div>
        </div>
      `;
    }
}