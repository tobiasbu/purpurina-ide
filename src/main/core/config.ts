import * as os from 'os';
import { UserInfo } from '@shared/types';

export default function initializeGlobal(): void {
  const osUserInfo = os.userInfo();

  const userInfo: UserInfo = {
    homeDir: osUserInfo.homedir,
    userName: osUserInfo.username,
  };

  global.userInfo = Object.freeze(userInfo);
}

// function createEditorSettings(dirname: string): EditorSettings {

//     const pathToFile = path.join(dirname, 'settings.json');
//     const json : EditorSettings = {
//         langugage: 'en',
//         recentProjects: []
//     }

//     fse.writeFileSync(pathToFile, JSON.stringify(json, null, '\t'));

//     return json;
// }

// function loadEditorSettings(dirname: string): EditorSettings {
//     const pathToFile = path.join(dirname, 'settings.json');
//     let json : EditorSettings
//     try {
//         const data = fs.readFileSync(pathToFile, {encoding:'utf-8', flag:'r'});
//         json = JSON.parse(data);
//     } catch {
//         json = createEditorSettings(dirname);
//     }
//     return json;
// }

// export function loadEditorConfig() {

//     const EDITOR_CONFIG_PATH = path.join(global.userInfo.homeDir, path.sep , '.Scintilla');
//     const FIRST_TIME = !fse.existsSync(EDITOR_CONFIG_PATH);
//     let config: EditorSettings;

//     if (FIRST_TIME) {

//         try {
//             fse.mkdirpSync(EDITOR_CONFIG_PATH);
//             fse.mkdirpSync(path.join(EDITOR_CONFIG_PATH, 'logs'));
//         } catch (err) {
//             throw err;
//         }

//         config = createEditorSettings(EDITOR_CONFIG_PATH);
//     } else {
//         config = loadEditorSettings(EDITOR_CONFIG_PATH);
//     }

//     return config;

// }

// export function saveEditorConfig(config: EditorSettings): Promise<boolean> {
//     const EDITOR_CONFIG_PATH = path.join(global.userInfo.homeDir, path.sep , '.Scintilla');

//     const jsonStr = JSON.stringify(config, null, '\t');

//     return fs.promises.writeFile(EDITOR_CONFIG_PATH, jsonStr)
//         .then(() => true)
//         .catch(() => false);
// }
