import hyper from 'hyperhtml';

import { getUserInfo } from '@shared/index';
import Dialogs from '@shared/Dialogs';
import pathValidation from '@shared/utils/pathValidation';
import { ipcRenderer } from 'electron';
import { ICreateProject } from 'shared/types';


const userInfo = getUserInfo();
const DEFAULT_LOCATION = userInfo.homeDir;
const DEFAULT_AUTHOR = userInfo.userName;

export default class CreateProjectPage extends hyper.Component {

  private projectName: string;
  private location: string;
  private author: string;

  private creatingProject: boolean = false;

  private nameInputElement: HTMLInputElement;
  private nameErrorElement: HTMLElement;

  private browseErrorElement: HTMLElement;
  private browseLocationElement: HTMLInputElement;

  constructor() {
    super();

    this.projectName = 'New Project 1';
    this.location = DEFAULT_LOCATION;
    this.author = DEFAULT_AUTHOR;

    this.nameErrorElement = hyper.wire()`<p class='inputInfo'></p>`;
    this.browseErrorElement = hyper.wire()`<p class='inputInfo'></p>`;

    this.nameInputElement = hyper.wire()`
        <input
            id="project-name"
            accept-charset="UTF-8"
            type="text"
            value=${this.projectName}
            oninput=${this.onInput}
            maxlength="214"
            />
        `;

    this.browseLocationElement = hyper.wire()`
         <input
            id="project-location"
            accept-charset="UTF-8"
            type="text"
            value=${this.location}
            style="padding-right: 48px;"
            webkitdirectory
            oninput=${this.onInput}
            />`;

    // ipcRenderer.on('response_projectNameValidation', (a: EventEmitter, b: ) => {
    //     console.log(a);
    // })
  }

  private onInput = (e: Event) => {
    // const inputEvent = (e as any);
    const inputElement = (e.srcElement as HTMLInputElement);
    let error: string;
    const testValue = inputElement.value;
    switch (inputElement.id) {
      case 'project-name': {
        error = pathValidation.folderName(testValue);
        this.nameErrorElement.textContent = error;
        if (error.length === 0) {
          this.projectName = testValue;
        }
        break;
      }
      case 'project-location': {
        error = pathValidation.path(testValue);
        this.browseErrorElement.textContent = error;
        if (error.length === 0) {
          this.location = testValue;
        }

        break;
      }
      case 'project-author': {
        this.author = testValue;
        error = '';
        break;
      }
    }

    inputElement.setCustomValidity(error);
  }

  private browseLocation = () => {
    const path = Dialogs.openDirectoryDialog(this.location);

    if (path) {
      const error = pathValidation.path(path);
      this.browseLocationElement.value = path;
      this.browseLocationElement.setCustomValidity(error);
      this.location = path;
      this.browseErrorElement.textContent = error;
    }
  }

  private createProject = () => {

    if (this.creatingProject === true) {
      return;
    }

    this.creatingProject = true;

    const createProject: ICreateProject = {
      projectName: this.projectName,
      location: this.location,
      author: this.author,
    };

    ipcRenderer.send('createProject', createProject);

    this.creatingProject = false;
  }

  reset() {
    this.projectName = 'New Project 1';
    this.location = DEFAULT_LOCATION;
    this.author = DEFAULT_AUTHOR;

    this.nameInputElement.setCustomValidity('');
    this.nameInputElement.value = this.projectName;
    this.nameErrorElement.textContent = '';

    this.browseLocationElement.setCustomValidity('');
    this.browseLocationElement.value = this.location;
    this.browseErrorElement.textContent = '';
  }

  render() {
    return hyper.wire(this)`
        <label>Project name</label>
        <div class="textbox">
           ${this.nameInputElement}
        </div>
        ${this.nameErrorElement}
        <label>Location</label>
        <div class="textbox">
           ${this.browseLocationElement}
            <div class='browse-icon-container'>
                <div class='browse-icon'
                onclick=${this.browseLocation}
                />
                <!-- <img src='browse_icon.png'> -->
            </div>
        </div>
        ${this.browseErrorElement}
        <label>Author / Organzation</label>
        <div class="textbox">
            <input id='project-author'
            accept-charset="UTF-8"
            type="text" value=${this.author} maxlength="255"  oninput=${this.onInput}/>
        </div>
      <button
        style = "float:right;margin-top:52px;"
        onclick = ${ this.createProject}
        > Create Project </button>
  `;
  }

}
