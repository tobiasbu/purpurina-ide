
const INVALID_FOLDER_CHARS = /[<>:\x22\/\\|?*\x00-\x1F]+/;
const INVALID_PATH_CHARS = /[<>:\x22|?*\x00-\x1F]+/;
const WIN_SPECIAL_CHARS = /^(?:aux|con|clock\$|nul|prn|com[1-9]|lpt[1-9])$/i;
const WIN_DISK = /^([a-zA-Z]:)(\\|\/)/


const PathValidate = {

    folderName(value: string) {

        if (value.length === 0 || value.trim().length === 0) {
            return 'Empty project name. Please give a name for your project';
        }

        if (WIN_SPECIAL_CHARS.test(value)) {
            const match = WIN_SPECIAL_CHARS.exec(value);
            return `Illegal word. This is a Windows reserved word \'${match[0]}\'`
        }

        if (INVALID_FOLDER_CHARS.test(value)) {
            return `Illegal characters. Make sure to not using characters such <, >, :, \", /, \\, |, ?, *`
        }

        return '';
    },

    path(value: string) {

        if (value.length === 0 || value.trim().length === 0) {
            return 'Empty path. The project location can not be empty.';
        }

        if (!WIN_DISK.test(value)) {
            return 'The path not absolute.';
        }

        value = value.substr(2)

        if (INVALID_PATH_CHARS.test(value)) {
            return 'Illegal characters. Make sure to not using characters such <, >, :, \", |, ?, *';
        }

        return '';


    }

}

export default PathValidate;