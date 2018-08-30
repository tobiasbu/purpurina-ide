// <reference path='HTML.d.ts'/>

//import * as m from './HTML';

import { Properties } from 'csstype';

//import * as CSS from 'csstype';

declare global {

    module HTML {

        interface InlineStyle extends Properties<string | number> {

        }

    }

}





