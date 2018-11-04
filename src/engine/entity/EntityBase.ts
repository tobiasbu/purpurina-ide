
/*
* Base class for Entities
*/
export default class EntityBase {

    private _name:string;
    private _active: boolean;
    //
   // this._priority = 0;
    //this.game = game || undefined; 
    private _persistent: boolean;

    constructor(name: string)
    {
        this._name = name || 'New Entity';
        this._active = true;
        this._persistent = false;
        //this._pool = null;
       // this._priority = 0;
        //this.game = game || undefined; 
       
    }

    public get persistent(): boolean {
        return this._persistent;
    }
    public set persistent(value: boolean) {
        this._persistent = value;
    }

    get active(): boolean {return this._active;}
    set active(value: boolean)
    {
        value = !!value;

        if (value !== this._active)
            this._active = value;
    }

    get name(): string {return this._name;}
    set name(value: string)
    {
        if (value !== this._name)
            this._name = value;

    }


};