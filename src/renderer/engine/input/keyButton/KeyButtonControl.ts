
export enum KeyButtonStatus {
    /**
     * No key/button status
     * @param {number} 0
     */
    NONE,
    
    /**
     * 
     */
    IDLE,
    /**
     * Key/button is pressed
     * @param {number} 2
     */
    PRESSED,
     /**
     * Key/button was pressed
     * @param {number} 3
     */
    POST_PRESSED,
    /**
     * Key/button is released
     * @param {number} 4
     */
    RELEASED,
};

export default class KeyButtonControl {

    private _enabled: boolean;
    private _code: number;


    private _preventDefault = true;
    status: KeyButtonStatus;
    press = false;
    down = false;
    up = false;
    downTime = 0;
    downDuration = -2500;
    upTime = 0;
    upDuration = -2500;


    constructor(code: number) {

        this._code = code; 

        this._enabled = true;    
        this.status = KeyButtonStatus.NONE; 

        this.press = false;
        this.down = false;
        this.up = false;

        this.preventDefault = true;
      
        this.downTime = 0;
        this.downDuration = -2500;
        this.upTime = 0;
        this.upDuration = -2500;
      

    }

    public get code(): number {
        return this._code;
    }

    public get preventDefault() {
        return this._preventDefault;
    }
    public set preventDefault(value) {
        this._preventDefault = value;
    }
  

    get enabled() {return this._enabled;}
    set enabled(value) {
        value = !!value;

        if (value !== this._enabled)
        {
            if (!value)
                this.reset();

            this._enabled = value;
        }
    }

    isPressing() {
        return this.press;
    }

    isPressed() {
        return (this.down && this.status === KeyButtonStatus.PRESSED);
    }

    isReleased() {
        return (!this.down && this.upDuration === 0);
    }

    reset() {   
        this.press = false;
        this.status = KeyButtonStatus.NONE;
        this.down = false;
        this.up = false;
    
        this.downTime = 0;
        this.downDuration = -2500;
        this.upTime = 0;
        this.upDuration = -2500;
    }


}