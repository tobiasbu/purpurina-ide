/**
 * Base class for engine systems
 */
abstract class EngineSystem {
  protected _enabled: boolean;
  protected _initialized: boolean;
  readonly systemName: string;

  constructor(systemName: string) {
    this.systemName = systemName;
    this._enabled = true;
    this._initialized = false;
  }

  // get systemName(): string {
  //     return this._systemName;
  // }

  get enabled(): boolean {
    return this._enabled;
  }

  set enabled(value: boolean) {
    value = !!value;

    if (value !== this._enabled) {
      if (!value) this.reset();

      this._enabled = value;
    }
  }

  abstract reset();
  abstract init(config?: any, ...args: any[]);
  abstract destroy();
  protected abstract onEnable();
  protected abstract onDisable();
}

export default EngineSystem;
