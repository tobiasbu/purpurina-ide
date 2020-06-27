import hyper from 'hyperhtml';
import * as PathValidation from '@shared/utils/pathValidation';

import TextInput from '../commons/TextInput';
import Button from '../commons/Button';

const userInfo = window.userInfo;
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
      innerElement: (): HTMLElement =>
        hyper.wire(this)`
          <div class='browse-icon-container'>
             <button
             type="button"
             role="button"
             title="Browse location for new project"
             class="btn-icon"
             onclick=${async (e) => {
               await this.browseLocation(e);
             }}
            >
              ${{ html: browseIcon }}
            </button>
        </div>`,
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
  }

  private onInput = (e: Event): void => {
    const inputElement = e.srcElement as HTMLInputElement;
    let error: string;
    const testValue = inputElement.value;
    switch (inputElement.id) {
      default:
        break;
      case 'project-name': {
        error = PathValidation.folderName(testValue);
        this.nameInput.setError(error);
        break;
      }
      case 'location': {
        error = PathValidation.path(testValue);
        this.locationInput.setError(error);
        break;
      }
      case 'project-author': {
        error = '';
        break;
      }
    }
  };

  private async browseLocation(e) {
    if (e) {
      e.preventDefault();
    }
    let path;
    try {
      path = await window.dialogs.openDirectory({
        defaultPath: this.locationInput.value,
        title: 'Browse location for you new project',
      });
    } catch (e) {
      console.error(e);
    }
    if (path) {
      const error = PathValidation.path(path);
      this.locationInput.setValue(path);
      this.locationInput.setError(error);
    }
  }

  private onSubmit = (e: Event): void => {
    if (e) {
      e.preventDefault();
    }

    if (this.creatingProject === true) {
      return;
    }
    this.creatingProject = true;
    const projectmetadata: Project.Create = {
      projectName: this.nameInput.value,
      location: this.locationInput.value,
      author: this.authorInput.value,
    };
    globalThis.project.create(projectmetadata);
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
        <form autocomplete="off" novalidate onsubmit=${this.onSubmit}>
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
