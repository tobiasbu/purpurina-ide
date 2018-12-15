
import * as fse from 'fs-extra';
import * as path from 'path';
import * as os from 'os';

const homeDir = os.homedir();
const EDITOR_CONFIG_PATH = path.join(homeDir, path.sep, '.glitter');
const SETTINGS_PATH = path.join(EDITOR_CONFIG_PATH, 'settings.json');

function checkSettingsPath(): boolean {
    const firstTime = !fse.existsSync(EDITOR_CONFIG_PATH);

    if (firstTime) {
        try {
            fse.mkdirpSync(EDITOR_CONFIG_PATH);
            fse.mkdirpSync(path.join(EDITOR_CONFIG_PATH, 'logs'));
        } catch (err) {
            throw err;
        }
    }

    return firstTime;
}

interface IEditorSettings {
    readonly recentProjects: string[];
    readonly langugage: string;
}

export default class EditorSettings implements IEditorSettings {


    private _recentProjects: string[];
    private _langugage: string;

    public get langugage(): string {
        return this._langugage;
    }

    public get recentProjects(): string[] {
        return this._recentProjects;
    }

    /**
     * Constructor
     */
    constructor(json?: IEditorSettings) {

        if (!json) {
            this._recentProjects = [];
            this._langugage = 'en';
        } else {
            this._recentProjects = json.recentProjects || [];
            this._langugage = json.langugage || 'en';
        }

        
    }

    static createAsync(): Promise<EditorSettings> {
        return new Promise((resolve, reject) => {
            const settings = new EditorSettings();

            fse.promises.writeFile(SETTINGS_PATH, settings.toJSON(true))
                .then(() => {
                    resolve(settings);
                })
                .catch(err => reject(err));
        });
    }

    static create(): EditorSettings {
        const config = new EditorSettings();
        fse.writeFileSync(SETTINGS_PATH, config.toJSON(true));
        return config;
    }

    static load(): EditorSettings {
        let config: EditorSettings;
        if (checkSettingsPath()) {
            config = this.create();
        } else {
            try {
                const data = fse.readFileSync(SETTINGS_PATH, { encoding: 'utf-8', flag: 'r' });
                config = new EditorSettings(JSON.parse(data));
            } catch {
                config = EditorSettings.create();
            }
        }

        return config;
    }

    static loadAsync(): Promise<EditorSettings> {

        let p: Promise<EditorSettings>;
        if (checkSettingsPath()) {
            p = this.createAsync();
        } else {
            p = new Promise((resolve) => {
                fse.promises.readFile(SETTINGS_PATH, { encoding: 'utf-8' })
                    .then((value: string) => {
                        const json: EditorSettings = JSON.parse(value);
                        resolve(new EditorSettings(json));
                    })
            })
        }
        return p;
    }

    addRecentProject(projectPath: string): void {
        if (!this._recentProjects) {
            this._recentProjects = [];
            this._recentProjects.push(projectPath);
        } else {
            this._recentProjects.unshift(projectPath);

            if (this._recentProjects.length > 10) {
                this._recentProjects.pop();
            }
        }
    }

    save() {
        checkSettingsPath();
        fse.writeFileSync(SETTINGS_PATH, this.toJSON(true));
    }

    toJSON(stringify: boolean = false) {
        const json = {
            recentProjects: this._recentProjects,
            langugage: this._langugage
        }

        if (stringify === true) {
            return JSON.stringify(json, null, '\t')
        }

        return json;
    }

}