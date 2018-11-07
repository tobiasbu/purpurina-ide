import hyper from "hyperhtml";
import ProjectContainer from "../components/ProjectContainer";
import { IProjectInfo } from "../../shared/typings";


export default class HomePage extends hyper.Component {

    private projectsElements: ProjectContainer[];

    setup(projects: IProjectInfo[]) {

        console.log(projects)

        if (!projects) {
            this.projectsElements = null;
        } else {

            this.projectsElements = [];
            projects.forEach(element => {
                this.projectsElements.push(new ProjectContainer(element));
            });

        }

        this.render();
    }

    private welcomePage() {
        return hyper.wire()`
            <h2>Welcome to Scintilla!</h2>
            <p>Click on "New Project" button to create a something new.</p>
            <p>Or click the "Open Project" button to load a project and continue working.</p>
            <p>Your recent work will appear here next time.</p>
            `;
    }

    render() {

        return hyper.wire(this)`
      <div class='home-page'>
        ${ !this.projectsElements ? this.welcomePage() : this.projectsElements}
      </div>
      `
            ;
    }
}