import hyper from "hyperhtml";
import { getUserInfo } from '../../../shared';
import Dialogs from "../../../shared/Dialogs";
import PathValidate from "../../../shared/utils/pathValidation";
import { ipcRenderer } from "electron";
import { ICreateProject } from "../../../shared/typings";

const userInfo = getUserInfo();
const DEFAULT_LOCATION = userInfo.homeDir;
const DEFAULT_AUTHOR = userInfo.userName;

export default class CreateProjectPage extends hyper.Component {

    private _projectName: string;
    private _location: string;
    private _author: string;

    private _creatingProject: boolean = false;

    private _nameInputElement: HTMLInputElement;
    private _nameErrorElement: HTMLElement;

    private _browseErrorElement: HTMLElement;
    private _browseLocationElement: HTMLInputElement;

    constructor() {
        super();

        this._projectName = "New Project 1";
        this._location = DEFAULT_LOCATION;
        this._author = DEFAULT_AUTHOR;

        this._nameErrorElement = hyper.wire()`<p class='inputInfo'></p>`;
        this._browseErrorElement = hyper.wire()`<p class='inputInfo'></p>`;

        this._nameInputElement = hyper.wire()`        
        <input 
            id="project-name"
            accept-charset="UTF-8" 
            type="text" 
            value=${this._projectName}
            oninput=${(e) => this.onInput(e)}
            maxlength="214"
            />
        `

        this._browseLocationElement = hyper.wire()`
         <input 
            id="project-location"
            accept-charset="UTF-8" 
            type="text" 
            value=${this._location}
            style="padding-right: 48px;"
            webkitdirectory 
            oninput=${(e) => this.onInput(e)}
            />`

        // ipcRenderer.on('response_projectNameValidation', (a: EventEmitter, b: ) => {
        //     console.log(a);
        // })
    }

    private onInput(e: Event) {
        // const inputEvent = (e as any);
        const inputElement = (e.srcElement as HTMLInputElement);
        let error: string;
        const testValue = inputElement.value;
        switch (inputElement.id) {
            case 'project-name': {
                error = PathValidate.folderName(testValue);
                this._nameErrorElement.textContent = error;
                if (error.length === 0) {
                    this._projectName = testValue;
                }
                break;
            }
            case 'project-location': {
                error = PathValidate.path(testValue);
                this._browseErrorElement.textContent = error;
                if (error.length === 0) {
                    this._location = testValue;
                }

                break;
            }
            case 'project-author': {
                this._author = testValue;
                error = '';
                break;
            }
        }

        inputElement.setCustomValidity(error);
    }

    private browseLocation = () => {
        const path = Dialogs.openDirectoryDialog(this._location)

        if (path) {
            const error = PathValidate.path(path);
            this._browseLocationElement.value = path;
            this._browseLocationElement.setCustomValidity(error);
            this._location = path;
            this._browseErrorElement.textContent = error;
        }
    }

    private createProject = () => {

        if (this._creatingProject === true) {
            return;
        }

        this._creatingProject = true;


        const createProject: ICreateProject = {
            projectName: this._projectName,
            location: this._location,
            author: this._author
        }

        ipcRenderer.send('createProject', createProject);

        this._creatingProject = false;
    }

    reset() {
        this._projectName = "New Project 1";
        this._location = DEFAULT_LOCATION;
        this._author = DEFAULT_AUTHOR;

        this._nameInputElement.setCustomValidity('');
        this._nameInputElement.value = this._projectName;
        this._nameErrorElement.textContent = '';

       
        this._browseLocationElement.setCustomValidity('');
        this._browseLocationElement.value = this._location;
        this._browseErrorElement.textContent = '';
    }

    render() {
        return hyper.wire(this)`
        <label>Project name</label>
        <div class="textbox">
           ${this._nameInputElement}
        </div>
        ${this._nameErrorElement}
        <label>Location</label>
        <div class="textbox">
           ${this._browseLocationElement}
            <div class='browse-icon-container'>
                <div class='browse-icon' 
                onclick=${this.browseLocation} 
                />
                <!-- <img src='browse_icon.png'> -->
            </div>
        </div>
        ${this._browseErrorElement}
        <label>Author / Organzation</label>
        <div class="textbox">
            <input id='project-author' accept-charset="UTF-8" type="text"  value=${this._author} maxlength="255"  oninput=${(e) => this.onInput(e)}/>
        </div>
        <button 
            style="float:right;margin-top:52px;"
            onclick=${this.createProject}
        >Create Project</button>
        `;
    }

}