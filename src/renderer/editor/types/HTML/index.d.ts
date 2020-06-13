// export as namespace HTML;

//import { HTMLTags } from './HTMLTags';
import * as HTMLAttributes from './HTMLAttributes';
import { InlineStyle as InlineStyleCSS } from './InlineStyle';

declare global {
  module HTML {
    module Attributes {
      type TagMap = HTMLAttributes.AttributesTagMap;
    }

    //type Tags = HTMLTags;

    type InlineStyle = InlineStyleCSS;
  }
}
