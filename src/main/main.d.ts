/// <reference path="../../types/index.d.ts" />

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
