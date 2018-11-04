import hyper from "hyperhtml";
import { openDirectoryDialog, getUserInfo } from './../shared';

const FOLDER_REGEX = "[<>:\x22\/\\|?*\x00-\x1F]|^(?:aux|con|clock\$|nul|prn|com[1-9]|lpt[1-9])$/i";
const FOLDER_NAMEREGEX = /[<>:\x22\/\\|?*\x00-\x1F]+/;
const WIN_SPECIAL_CHARS = /^(?:aux|con|clock\$|nul|prn|com[1-9]|lpt[1-9])$/i;

function validateProjectName(element: HTMLInputElement) {

    const testValue = element.value;

    if (WIN_SPECIAL_CHARS.test(testValue)) {
        const match = WIN_SPECIAL_CHARS.exec(testValue);
        element.setCustomValidity("Illegal word.");
        return `Illegal word. This is a Windows reserved word \'${match[0]}\'`
    }

    if (FOLDER_NAMEREGEX.test(testValue)) {
        element.setCustomValidity("Illegal characters.");
        return `
        Illegal characters. 
        Make sure to not using characters such <, >, :, \", /, \\, |, ?, *`
    } else {
        element.setCustomValidity('')
        return "";
    }
}

export default class CreateProjectPage extends hyper.Component {

    private _projectName: string = "New Project 1";
    private _location: string;
    private _author: string;

    private _nameErrorElement: HTMLElement;
    private _browseLocationElement: HTMLInputElement;

    constructor() {
        super();
        const userInfo = getUserInfo();
        this._location = userInfo.homeDir;
        this._author = userInfo.userName;

        this._nameErrorElement = hyper.wire()`<p class='inputInfo'></p>`;
        this._browseLocationElement = hyper.wire()`
         <input 
            accept-charset="UTF-8" 
            type="text" 
            value=${this._location}
            style="padding-right: 48px;"
            webkitdirectory 
            />
        `
    }

    onInput(e: Event) {
        const inputEvent = (e as any);
        const inputElement = (e.srcElement as HTMLInputElement);
        switch (inputElement.id) {
            case 'create-project-name': {
                const error = validateProjectName(inputElement);
                this._nameErrorElement.textContent = error;
                break;
            }

        }
    }

    browseLocation = () => {
        const path = openDirectoryDialog(this._location)

        if (path) {
            this._browseLocationElement.value = path;
            this._location = path;
        }
    }

    render() {

        return hyper.wire(this)`
        <label>Project name</label>
        <div class="textbox">
            <input 
            id="create-project-name"
            accept-charset="UTF-8" 
            type="text" 
            value=${this._projectName}
            oninput=${(e) => this.onInput(e)}
            maxlength="255"
            />
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
        <label>Author/Organzation</label>
        <div class="textbox">
            <input accept-charset="UTF-8" type="text"  value=${this._author}></input>
        </div>
        <button style="float:right;margin-top:48px;">Create Project</button>
        `;
    }

}