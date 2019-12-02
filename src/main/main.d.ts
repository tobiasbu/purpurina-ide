/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserInfo } from '@shared/types';

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
