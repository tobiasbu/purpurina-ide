
/**
 * Base class for engine systems
 */
export default abstract class EngineSystem {

    private _enabled: boolean;
    private _name: string;

    constructor(systemName: string) {
        this._name = systemName;
        this._enabled = true;
    }

    get name(): string {
        return this._name;
    }

    get enabled(): boolean {
        return this._enabled;
    }

    set enabled(value: boolean) {
        value = !!value;

        if (value !== this._enabled) {
            if (!value)
                this.reset();

            this._enabled = value;
        }
    }

    abstract reset();
    abstract init();
    abstract destroy();
    protected abstract onEnable();
    protected abstract onDisable();



}