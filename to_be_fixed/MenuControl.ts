// tslint:disable-next-line: import-name
import hyper, { Component } from 'hyperhtml';
import HomePage from '../src/renderer/launcher/pages/HomePage';
import ScrollContainer from '../src/renderer/launcher/components/ScrollContainer';
import LearnPage from '../src/renderer/launcher/pages/LearnPage';
import CreateProjectPage from './pages/CreateProjectPage';

export default class MenuControl {
  private menuMap: Map<string, Component>;
  private homePage: ScrollContainer<HomePage>; // = new ScrollContainer(new ProjectListPage());
  private splashScreen: HTMLElement;
  private isLoaded: boolean = false;

  private contentElement: HTMLElement;
  // private menuElement: HTMLElement;
  private currentMenu: HTMLElement;
  private currentMenuType: string;

  constructor() {
    this.menuMap = new Map();
    this.menuRegister();
  }

  private menuRegister() {
    // this.menuElement = document.getElementById('menu');
    this.splashScreen = document.getElementById('splash');

    this.contentElement = document.getElementById('content');

    const projects = document.getElementById('home-button');
    const learn = document.getElementById('learn-button');
    const create = document.getElementById('new-project-button');

    projects.onclick = () => this.setActiveOption(projects);
    learn.onclick = () => this.setActiveOption(learn);
    create.onclick = () => this.setActiveOption(create);

    this.homePage = new ScrollContainer(new HomePage());

    this.menuMap.set(projects.id, this.homePage);
    this.menuMap.set(learn.id, new LearnPage());
    this.menuMap.set(create.id, new CreateProjectPage());
    this.setActiveOption(projects);
  }

  init(projects: IProjectInfo[]) {
    this.homePage.component.setup(projects);
    hyper(this.contentElement)`${this.homePage}`;
    this.splashScreen.classList.add('disable');
    setTimeout(() => {
      this.splashScreen.style.display = 'none';
    }, 300);
    this.isLoaded = true;
  }

  private setActiveOption(option: HTMLElement) {
    if (this.currentMenu === option) {
      return;
    }
    const optionType = option.classList.item(0);

    if (this.currentMenu) {
      this.currentMenu.className = this.currentMenuType;
    }
    option.className = optionType + ' selected';
    this.currentMenuType = optionType;
    this.currentMenu = option;

    if (this.isLoaded) {
      const page = this.menuMap.get(option.id);
      if (page) {
        if ((page as any).reset) {
          (page as any).reset();
        }
        hyper(this.contentElement)`${page}`;
      }
    }
  }
}
