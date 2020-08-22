declare var __PURPUR_DEV__: boolean;
declare type AnyType = string | number | boolean | object;

declare type AnyCallback = (...args: any) => any;
declare type Callback = (...args: any) => void;

/**
 * Provides a mechanism for releasing resources.
 */
interface IDisposable {
  dispose(): void;
}

declare namespace NodeJS {
  interface Global {
    __PURPUR_DEV__: boolean;
  }
}
