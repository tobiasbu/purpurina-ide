import hyper from "hyperhtml";
import { IProjectInfo } from "../../../shared/typings";
import HomePage from "../pages/HomePage";


// function parseThumbail(thumbail: string) {


//     if ((value as string).substr(0, 3).toLowerCase() === 'rgb') {
//         return CSSToColor(value, source);
//       } else {
//         return HexToColor(value, source);
//       }
// }

export default class ProjectContainer extends hyper.Component {

    private project: IProjectInfo;
    private parent: HomePage;
    private isSelected: boolean;
    private onSelection: (e:MouseEvent) => void;

    constructor(project: IProjectInfo, parent: HomePage) {
        super();
        this.project = project;
        this.parent = parent;
        this.isSelected = false;
        //this.onSelection = this.parent.selectProject.bind(parent, this);
    }

    public setSelection(flag: boolean): any {
        this.isSelected = flag;
        this.render();
    }

    render() {
        const { projectPackage, path } = this.project;
        let name, version, author : string;
        if (!this.project.error) {
            name = projectPackage.name;
            version = projectPackage.version || '?';
            author = projectPackage.author || '';
        } else {
            name = 'Unnamed project'
        }
        // const style = `background-color:${this.project.thumbnail}`;
        let className = "project-container";
        if (this.isSelected) {
            className = className.concat(" selected");
        }
        return hyper.wire(this)`
        <div class=${className} onmousedown=${() => { this.parent.selectProject(this); }} >
                    <div class="thumbnail"></div>
                    <div class="info">
                        <p class="title">${name}</p>
                        <p>${path}</p>
                        <p>${author} - ${version}</p>
                    </div>
        </div>
      `;
    }
}