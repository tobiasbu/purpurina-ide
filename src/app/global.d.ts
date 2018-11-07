
import { UserInfo } from '../shared/typings'


declare global {
    namespace NodeJS {
        interface Global {
            userInfo: UserInfo;
        }
    }
}

