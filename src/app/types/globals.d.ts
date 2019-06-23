
// import { UserInfo } from '../../shared/types'

export {}

declare global {
    namespace NodeJS {
        interface Global {
            userInfo: UserInfo;
        }
    }
}

