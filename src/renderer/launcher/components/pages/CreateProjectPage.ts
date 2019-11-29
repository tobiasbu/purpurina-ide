import hyper from 'hyperhtml';

import { ipcRenderer } from 'electron';
import { getUserInfo, PathValidation, Dialogs } from '@shared';
import { ICreateProject } from '@shared/types';

import TextInput from '../commons/TextInput';
import Button from '../commons/Button';

const userInfo = getUserInfo();
const DEFAULT_LOCATION = userInfo.homeDir;
const DEFAULT_AUTHOR = userInfo.userName;
const browseIcon = require('!svg-inline-loader!../../img/icon_browse.svg') as string;

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

    this.nameInput = new TextInput('Project Name', {
      onInput: this.onInput,
      maxLength: 214,
      initialValue: this.projectName,
    });

    this.locationInput = new TextInput('Location', {
      innerElement:  () => {
        return hyper.wire(this)`
          <div class='browse-icon-container'>
             <button
             role="button"
             title="Browse location for new project"
             class="btn-icon"
             onclick=${this.browseLocation}
            >
              ${{ html:  browseIcon }}
            </button>
        </div>`;
      },
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
        error = PathValidation.folderName(testValue);
        this.nameInput.setError(error);
        if (error.length === 0) {
          this.projectName = testValue;
        }
        break;
      }
      case 'location': {
        error = PathValidation.path(testValue);
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

  private browseLocation = () => {
    const path = Dialogs.openDirectory({
      defaultPath: this.location,
      title: 'Browse location for you new project',
    });
    if (path) {
      const error = PathValidation.path(path);
      this.locationInput.setValue(path);
      this.locationInput.setError(error);
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

  public reset(): void {
    this.projectName = 'New Project 1';
    this.location = DEFAULT_LOCATION;
    this.author = DEFAULT_AUTHOR;
    this.nameInput.reset();
    this.locationInput.reset();
    this.authorInput.reset();
  }

  render() {
    return this.html`
      <div class="page-wrapper">
          <div class="page-main-content">
            ${this.nameInput}
            ${this.locationInput}
            ${this.authorInput}
          </div>
          ${Button('Create Project')}
      </div>
  `;
  }

}
