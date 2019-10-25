import hyper from 'hyperhtml';
import { ipcRenderer } from 'electron';
import * as debouncePromise from 'debounce-promise';

import { getUserInfo } from '@shared/index';
import Dialogs from '@shared/Dialogs';
import pathValidation from '@shared/utils/pathValidation';

import { ICreateProject, AnyCallback } from 'shared/types';
import TextInput from '../commons/TextInput';
import Button from '../commons/Button';

const userInfo = getUserInfo();
const DEFAULT_LOCATION = userInfo.homeDir;
const DEFAULT_AUTHOR = userInfo.userName;

export default class CreateProjectPage extends hyper.Component {

  private projectName: string;
  private location: string;
  private author: string;

  private creatingProject: boolean = false;

  private nameInput: TextInput;
  private locationInput: TextInput;
  private authorInput: TextInput;

  get title(): string {
    return 'Create a New Project';
  }

  constructor() {
    super();

    this.projectName = 'New Project 1';
    this.location = DEFAULT_LOCATION;
    this.author = DEFAULT_AUTHOR;

    // this.nameErrorElement = hyper.wire()`<p class='inputInfo'></p>`;
    // this.browseErrorElement = hyper.wire()`<p class='inputInfo'></p>`;

    this.nameInput = new TextInput('Project Name', {
      onInput: this.onInput,
      maxLength: 214,
      initialValue: this.projectName,
    });

    this.locationInput = new TextInput('Location', {
      onInput: this.onInput,
      attributes: 'webkitdirectory',
      initialValue: this.location,
      style: 'padding-right: 48px',
    });

    this.authorInput = new TextInput('Author / Organization', {
      initialValue: this.author,
      maxLength: 255,
    });

    // function validatePath(message) {
    //   Promise.resolve(message);
    //   console.log(message);
    // }

    // ipcRenderer.on('launcher_pathValidated', validatePath);

    // const promiseValidator = (testValue: string) => {
    //   ipcRenderer.send('launcher_validatePath', {
    //     path: testValue,
    //   });
    // };

    // this.pathValidator = debouncePromise(promiseValidator, 200, {
    //   leading: false,
    // });

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
        this.nameInput.setError(error);
        if (error.length === 0) {
          this.projectName = testValue;
        }
        break;
      }
      case 'location': {
        error = pathValidation.path(testValue);
        this.locationInput.setError(error);
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
  }

  // private browseLocation = () => {
  //   const path = Dialogs.openDirectoryDialog(this.location);

  //   if (path) {
  //     const error = pathValidation.path(path);
  //     this.browseLocation.value = path;
  //     this.browseLocation.setCustomValidity(error);
  //     this.location = path;
  //     this.browseErrorElement.textContent = error;
  //   }
  // }

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
    this.nameInput.reset();
    this.locationInput.reset();
  }

  render() {
    return this.html`
        <div class="page-wrapper">
          ${this.nameInput}
          ${this.locationInput}
          ${this.authorInput}
            <div class='browse-icon-container'>
                <div class='browse-icon'
                onclick=${this.locationInput}
                />
                <!-- <img src='browse_icon.png'> -->
                </div>
                ${Button('Create Project')}
      </div>
  `;
  }

}
