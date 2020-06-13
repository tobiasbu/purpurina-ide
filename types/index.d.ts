declare var __PURPUR_DEV__: boolean;
declare type AnyType = string | number | boolean | object;

declare namespace NodeJS {
  interface Global {
    __PURPUR_DEV__: boolean;
  }
}
