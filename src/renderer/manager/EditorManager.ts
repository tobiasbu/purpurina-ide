
import EventEmitter from "../engine/events/emitter/EventEmitter";
import EditorInput from "./EditorInput";


export default class EditorManager extends EventEmitter {

    private _editorInput: EditorInput;
    private _body: HTMLElement;


    public get input(): EditorInput {
        return this._editorInput;
    }

    public get body(): HTMLElement {
        return this._body;
    }

    

    constructor() {
        super();
        this._editorInput = new EditorInput(this);
    }

    init() {
        this._body = document.getElementsByTagName("BODY")[0] as HTMLElement;
        this._editorInput.init();

        
    }

}