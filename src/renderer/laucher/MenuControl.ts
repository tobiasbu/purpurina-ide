import hyper, { Component } from "hyperhtml";
import HomePage from "./pages/HomePage";
import ScrollContainer from "./components/ScrollContainer";
import LearnPage from "./pages/LearnPage";
import CreateProjectPage from "./pages/CreateProjectPage";
import { IProjectInfo } from "../../shared/typings";

export default class MenuControl {

    private menuMap: Map<string, Component>
    private _homePage: ScrollContainer<HomePage>;// = new ScrollContainer(new ProjectListPage());
    private _splashScreen: HTMLElement;
    private _isLoaded: boolean = false;

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
        this._splashScreen = document.getElementById('splash');

        this.contentElement = document.getElementById('content');

        const projects = document.getElementById('home-button');
        const learn = document.getElementById('learn-button');
        const create = document.getElementById('new-project-button');

        projects.onclick = () => this.setActiveOption(projects);
        learn.onclick = () => this.setActiveOption(learn);
        create.onclick = () => this.setActiveOption(create);
        
        this._homePage = new ScrollContainer(new HomePage());

        this.menuMap.set(projects.id, this._homePage);
        this.menuMap.set(learn.id, new LearnPage());
        this.menuMap.set(create.id, new CreateProjectPage());
        this.setActiveOption(projects);

    }

    init(projects: IProjectInfo[]) {
        this._homePage.component.setup(projects);
        hyper(this.contentElement)`${this._homePage}`
        this._splashScreen.classList.add('disable'); 
        setTimeout(() => {
            this._splashScreen.style.display = 'none';
        }, 300);        
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
                if ((page as any).reset) {
                    (page as any).reset();
                }
                hyper(this.contentElement)`${page}`
            }
        }
    }

}

