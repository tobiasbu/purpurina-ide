import maestro, { RenderFunction } from 'maestro';
import hyper from 'hyperhtml';

import Button from '../../commons/Button';
import { isValid } from 'shared/utils';
import WelcomePage from './WelcomePage';
import RecentProjectsPage from './RecentProjectsPage';
import { IProjectInfo } from 'shared/types';

export default class HomePage extends hyper.Component {

  private projects: RecentProjectsPage;

  get title(): string {
    if (!this.projects) {
      return 'Welcome to Purpurina!';
    }
    return 'Recent Projects';
  }

  /**
   * Return if was project was loaded successfully
   * @param projects Project metadata list
   */
  public load(projects: IProjectInfo[]): boolean {
    if (!this.projects && isValid(projects)) {
      this.projects = new RecentProjectsPage(projects);
      this.render();
      return true;
    }
    return false;
  }

  // constructor() {
  //   super();
  //   this.projectsElements = [
  //     // new ProjectContainer({
  //     //   index: 0,
  //     //   path: 'C:/tobi/ProjetoEKO',
  //     //   projectPackage: {
  //     //     author: 'Irmãos Bu',
  //     //     name: 'Projeto EKO',
  //     //     thumbnail: null,
  //     //     version: '0.0.1',
  //     //   },
  //     // },                   this),
  //     // new ProjectContainer({
  //     //   index: 0,
  //     //   path: 'C:/tobi/ProjetoEKO',
  //     //   projectPackage: {
  //     //     author: 'Irmãos Bu',
  //     //     name: 'Projeto EKO',
  //     //     thumbnail: null,
  //     //     version: '0.0.1',
  //     //   },
  //     // },                   this),
  //     // new ProjectContainer({
  //     //   index: 0,
  //     //   path: 'C:/tobi/ProjetoEKO',
  //     //   projectPackage: {
  //     //     author: 'Irmãos Bu',
  //     //     name: 'Projeto EKO',
  //     //     thumbnail: null,
  //     //     version: '0.0.1',
  //     //   },
  //     // },                   this),
  //     // new ProjectContainer({
  //     //   index: 0,
  //     //   path: 'C:/tobi/ProjetoEKO',
  //     //   projectPackage: {
  //     //     author: 'Irmãos Bu',
  //     //     name: 'Projeto EKO',
  //     //     thumbnail: null,
  //     //     version: '0.0.1',
  //     //   },
  //     // },                   this),
  //     // new ProjectContainer({
  //     //   index: 0,
  //     //   path: 'C:/tobi/ProjetoEKO',
  //     //   projectPackage: {
  //     //     author: 'Irmãos Bu',
  //     //     name: 'Projeto EKO',
  //     //     thumbnail: null,
  //     //     version: '0.0.1',
  //     //   },
  //     // },                   this),
  //     // new ProjectContainer({
  //     //   index: 0,
  //     //   path: 'C:/tobi/ProjetoEKO',
  //     //   projectPackage: {
  //     //     author: 'Irmãos Bu',
  //     //     name: 'Projeto EKO',
  //     //     thumbnail: null,
  //     //     version: '0.0.1',
  //     //   },
  //     // },                   this),
  //     // new ProjectContainer({
  //     //   index: 0,
  //     //   path: 'C:/tobi/ProjetoEKO',
  //     //   projectPackage: {
  //     //     author: 'Irmãos Bu',
  //     //     name: 'Projeto EKO',
  //     //     thumbnail: null,
  //     //     version: '0.0.1',
  //     //   },
  //     // },                   this),
  //   ];

  // }

  render() {

    let el: RenderFunction | any;

    if (isValid(this.projects)) {
      el = this.projects;
    } else {
      el = WelcomePage();
    }

    return hyper.wire(this)`
    <div class="page-main-content">
    ${el}
    </div>
    <div class="page-bottom-bar">
      <div class="button-row">
      ${Button('Open Project')}
      </div>
    </div>
      `;
  }
}
