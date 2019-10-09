/// <reference path="../shared/types/index.ts" />

export { }



declare global {
  namespace NodeJS {
    interface Global {
      userInfo: UserInfo;
    }
  }
}

// declare process {
//   namespace env {

//   }
// }
