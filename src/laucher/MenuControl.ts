import hyper, { Component } from "hyperhtml";
import ProjectListPage from "./ProjectListPage";
import { IProjectInfo } from "./IProjectInfo";
import ScrollContainer from "./ScrollContainer";
import LearnPage from "./LearnPage";
import CreateProjectPage from "./CreateProjectPage";

export default class MenuControl {

    private menuMap: Map<string, Component>
    private projectList = new ScrollContainer(new ProjectListPage());
    private _isLoaded: boolean = false;

    private contentElement: HTMLElement;
    private menuElement: HTMLElement;
    private currentMenu: HTMLElement;
    private currentMenuType: string;

    constructor() {
        this.menuMap = new Map();
        this.menuRegister();
    }

    private menuRegister() {

        this.menuElement = document.getElementById('menu');

        this.contentElement = document.getElementById('content');

        const projects = document.getElementById('projects-button');
        const learn = document.getElementById('learn-button');
        const create = document.getElementById('new-project-button');

        projects.onclick = () => this.setActiveOption(projects);
        learn.onclick = () => this.setActiveOption(learn);
        create.onclick = () => this.setActiveOption(create);
        
        this.menuMap.set(projects.id, this.projectList);
        this.menuMap.set(learn.id, new LearnPage());
        this.menuMap.set(create.id, new CreateProjectPage());
        this.setActiveOption(projects);

    }

    init(projects: IProjectInfo[]) {
        this.projectList.component.setup(projects);
        this.menuElement.className = '';
        hyper(this.contentElement)`${this.projectList}`
        this._isLoaded = true;
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

        if (this._isLoaded) {
            
            const page = this.menuMap.get(option.id);
            if (page) {
                hyper(this.contentElement)`${page}`
            }
        }
    }

}

