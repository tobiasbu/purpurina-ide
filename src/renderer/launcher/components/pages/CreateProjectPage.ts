import hyper from 'hyperhtml';

import { ipcRenderer } from 'electron';

import { CreateProject } from '@shared/types';
import { getUserInfo, PathValidation, Dialogs } from '@shared';

import TextInput from '../commons/TextInput';
import Button from '../commons/Button';

const userInfo = getUserInfo();
const DEFAULT_LOCATION = userInfo.homeDir;
const DEFAULT_AUTHOR = userInfo.userName;
import browseIcon = require('../../img/icon_browse.svg');

export default class CreateProjectPage extends hyper.Component {
  private creatingProject: boolean;
  private nameInput: TextInput;
  private locationInput: TextInput;
  private authorInput: TextInput;
  readonly title = 'Create a New Project';

  constructor() {
    super();
    this.creatingProject = false;
    this.nameInput = new TextInput('Project Name', {
      onInput: this.onInput,
      maxLength: 214,
      initialValue: 'New Project 1',
      required: true,
    });

    this.locationInput = new TextInput('Location', {
      innerElement: (): HTMLElement => (
        hyper.wire(this)`
          <div class='browse-icon-container'>
             <button
             role="button"
             title="Browse location for new project"
             class="btn-icon"
             onclick=${this.browseLocation}
            >
              ${{ html: browseIcon }}
            </button>
        </div>`
      ),
      onInput: this.onInput,
      attributes: 'webkitdirectory',
      initialValue: DEFAULT_LOCATION,
      style: 'padding-right: 48px',
      required: true,
    });

    this.authorInput = new TextInput('Author / Organization', {
      initialValue: DEFAULT_AUTHOR,
      maxLength: 255,
      required: true,
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

  private onInput = (e: Event): void => {
    // const inputEvent = (e as any);
    const inputElement = (e.srcElement as HTMLInputElement);
    let error: string;
    const testValue = inputElement.value;
    switch (inputElement.id) {
      default:
        break;
      case 'project-name': {
        error = PathValidation.folderName(testValue);
        this.nameInput.setError(error);
        // if (error.length === 0) {
        //   this.projectName = testValue;
        // }
        break;
      }
      case 'location': {
        error = PathValidation.path(testValue);
        this.locationInput.setError(error);
        // if (error.length === 0) {
        //   this.location = testValue;
        // }

        break;
      }
      case 'project-author': {
        error = '';
        break;
      }
    }
  };

  private browseLocation = (): void => {
    const path = Dialogs.openDirectory({
      defaultPath: this.locationInput.value,
      title: 'Browse location for you new project',
    });
    if (path) {
      const error = PathValidation.path(path);
      this.locationInput.setValue(path);
      this.locationInput.setError(error);
    }
  };

  private onSubmit = (e: Event): void => {
    if (e) {
      e.preventDefault();
    }

    if (this.creatingProject === true) {
      return;
    }
    this.creatingProject = true;
    const createProject: CreateProject = {
      projectName: this.nameInput.value,
      location: this.locationInput.value,
      author: this.authorInput.value,
    };
    ipcRenderer.send('createProject', createProject);
    this.creatingProject = false;
  };

  public reset(): void {
    this.nameInput.reset();
    this.locationInput.reset();
    this.authorInput.reset();
  }

  render(): HTMLElement {
    return this.html`
      <div class="page-wrapper">
        <form autocomplete="off" onsubmit=${this.onSubmit}>
          <div class="page-main-content">
            ${this.nameInput}
            ${this.locationInput}
            ${this.authorInput}
          </div>
          ${Button('Create Project', { type: 'submit' })}
        </form>
      </div>
  `;
  }
}
