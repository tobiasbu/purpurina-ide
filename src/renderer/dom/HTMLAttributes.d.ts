
type IndexerType<K extends string> = {
    [key in K]?: any
}

type AutoCapitalizeType = (
    "on" |
    "off" |
    "none" |
    "sentences" |
    "words" |
    "characters" 
);

type ButtonType = (
    'submit' | 
    'reset' |
    'button'
)

/**
 * From: https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types
 */
type LinkType = (
    'alternate' |
    'author' |
    'help' |
    'license' |
    'next' |
    'prev' |
    'search' |
    'sidebar'
)

type AnchorLinkTypes = (
    LinkType |
    'bookmark' |
    'external' |
    'nofollow' |
    'noopener' |
    'noreferrer' |
    'tag'
)

type FormMethod = (
    'get' |
    'post'
)

type EncodingType = (
    'application/x-www-form-urlencoded' |
    'multipart/form-data' |
    'text/plain'
)

type ShapeType = (
    'default' |
    'rect' |
    'circle' |
    'poly'
)

type TargetKeywords = (
    /**
     * Load the URL into the same browsing context as the current one. 
     */
    '_self' |
    /**
     * Load the URL into a new browsing context.
     */
    '_blank' |
    /**
     *  Load the URL into the parent browsing context of the current one.
     */
    '_parent' |
    /**
     * Load the URL into the top-level browsing context (that is, the "highest" browsing context that is an ancestor of the current one, and has no parent). 
     */
    '_top'
)

type TextDirectionally = (
    'ltr' |
    'rtl' |
    'auto'
)

/**
 * Common attributes to all HTML elements.
 * They can be used on all elements, though they may have no effect on some elements.
 * 
 * Notes:
 * 
 * From: 
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
 * https://html.spec.whatwg.org/multipage/indices.html#attributes-3
 */
type HTMLAttributesNames = (
    'accesskey' |
    'autocapitalize' |
    'class' |
    'contenteditable' |
    'contextmenu' |
    'dir' |
    'draggable' |
    'dropzone' |
    'hidden' |
    'is' |
    'id' |
    'itemid' |
    'itemprop' |
    'itemref' |
    'itemscope' |
    'itemtype' |
    'lang' |
    'spellcheck' |
    'slot' |
    'style' |
    'title' |
    'translate' |
    'tabindex'
)

/**
 * Global HTML attributes
 */
interface HTMLAttributes {
    /**
     * Defines a keyboard shortcut to activate or add focus to the element.
     */
    accesskey?: string;
    /**
     * Controls whether and how text input is automatically capitalized as it is entered/edited by the user.
     */
    autocapitalize?: AutoCapitalizeType;
    /**
     * Often used with CSS to style elements with common properties.
     */
    class?: string;
    /**
     * Indicates whether the element's content is editable.
     */
    contenteditable?: boolean;
    /**
     * Defines the ID of a <menu> element which will serve as the element's context menu.
     */
    contextmenu?: string;
    /**
     * Defines the text direction. 
     * Allowed values are ltr (Left-To-Right) or rtl (Right-To-Left)
     */
    dir?: TextDirectionally;
    /**
     * Defines whether the element can be dragged.
     */
    draggable?: boolean;
    /**
     * Prevents rendering of given element, while keeping child elements, e.g. script elements, active.
     */
    hidden?: boolean;
    /**
     * Allows you to specify that a standard HTML element should behave like a registered custom built-in element.
     */
    is?: string;
    /**
     * Often used with CSS to style a specific element. The value of this attribute must be unique.
     */
    id?: string;
    /**
     * The unique, global identifier of an item.
     */
    itemid?: string;
    /**
     * Used to add properties to an item.
     */
    itemprop?: string;
    /**
     * Properties that are not descendants of an element with the itemscope attribute can be associated with the item using an itemref;
     */
    itemref?: string;
    itemscope?: boolean;
    /**
     * Specifies the URL of the vocabulary that will be used to define itemprops (item properties) in the data structure.
     */
    itemtype?: string;

    /**
     * Defines the language used in the element.
     */
    lang?: string;
    /**
     * Indicates whether spell checking is allowed for the element.
     */
    spellcheck?: boolean;
    /**
     * Assigns a slot in a shadow DOM shadow tree to an element.
     */
    slot?: string;
    /**
     * Defines CSS styles which will override styles previously set.
     */
    style?: CSSStyleRule;
    /**
     *  Text to be displayed in a tooltip when hovering over the element.
     */
    title?: string;
    /**
     * Specify whether an element’s attribute values and the values of its Text node children are
     * to be translated when the page is localized, or whether to leave them unchanged.
     */
    translate?: 'yes' | 'no';
    /**
     * Whether the element is focusable, and the relative order of the element for the purposes of sequential focus navigation 
     */
    tabindex?: number;
}



interface AnchorHTMLAttributes extends HTMLAttributes {
    /**
     * Indicates that the hyperlink is to be used for downloading a resource.
     */
    download?: any;
    /**
     * The URL of a linked resource.
     */
    href?: string;
    /**
     * Specifies the language of the linked resource.
     * 
     * Allowed values are determined by BCP47.
     */
    hreflang?: string;
    /**
     * Specifies a hint of the media for which the linked resource was designed.
     */
    media?: string;
    /**
     * Specifies the relationship of the target object to the link object.
     *
     * Use this attribute only if the 'href' attribute is present.
     */
    rel?: string;
    /**
     * Specifies where to display the linked URL.
     */
    target?: string | TargetKeywords;
    /**
     * Specifies the media type in the form of a MIME type for the linked URL. 
     */
    type?: AnchorLinkTypes;
}

interface AreaHTMLAttributes extends AnchorHTMLAttributes {
    /**
     * A text string alternative to display on browsers that do not display images. 
     */
    alt?: string;
    /**
     * A set of values specifying the coordinates of the hot-spot region.
     */
    coords?: string;
    shape?: ShapeType;
    /**
     * Specifies where to display the linked URL.
     */
    target?: string | TargetKeywords;
}

interface BaseHTMLAttributes extends HTMLAttributes {
    /**
     * The URL of a linked resource.
     */
    href?: string;
    /**
     * A name or keyword indicating the default location to display the result when hyperlinks or forms cause navigation, for elements that do not have an explicit target reference.
     */
    target?: string | TargetKeywords;
}

interface CanvasHTMLAttributes extends HTMLAttributes {
    /**
     * Specifies the height of <canvas>
     */
    height?: number | string;
    /**
     * Specifies the width of <canvas>
     */
    width?: number | string;
}

interface BlockQuoteHTMLAttributes extends HTMLAttributes {
    /**
     * A URL that designates a source document or message for the information quoted.
     */
    cite?: string;
}


interface ButtonHTMLAttributes extends HTMLAttributes {
    /**
     * The element should be automatically focused after the page loaded.
     */
    autofocus?: boolean;
    /**
     * Indicates whether the user can interact with the element.
     */
    disabled?: boolean;
    /**
     * Indicates the form that is the owner of the element.
     */
    form?: string;
    /**
     * Indicates the action of the element, overriding the action defined in the <form>.
     */
    formaction?: string;
    /**
     * If the button is a submit button, this attribute specifies the type of content that is used to submit the form to the server. 
     * 
     * If this attribute is specified, it overrides the 'enctype' attribute of the button's form owner.
     */
    formenctype?: EncodingType;
    /**
     * If the button is a submit button, this attribute specifies the HTTP method that the browser uses to submit the form. 
     * 
     * If specified, this attribute overrides the 'method' attribute of the button's form owner.
     */
    formmethod?: FormMethod;
    /**
     * If the button is a submit button, this Boolean attribute specifies that the form is not to be validated when it is submitted.
     * 
     * If this attribute is specified, it overrides the 'novalidate' attribute of the button's form owner.
     */
    formnovalidate?: boolean;
    /**
     * If the button is a submit button, this attribute is a name or keyword indicating where to display the response that is received after submitting the form.
     */
    formtarget?: string | TargetKeywords;
    /**
     * Name of the element. For example used by the server to identify the fields in form submits.
     */
    name?: string;
    /**
     * Defines the type of the element.
     */
    type?: ButtonType;
    /**
     * Defines a default value which will be displayed in the element on page load.
     */
    value?: string | string[] | number;
}

interface LabelHTMLAttributes extends HTMLAttributes {
    /**
     * Indicates the form that is the owner of the element.
     */
    form?: string;
    /**
     * Describes elements which belongs to this one.
     */
    for?: string;
}

interface HTMLAttributesTagMap {
    'a': AnchorHTMLAttributes;
    'abbr': HTMLAttributes;
    "acronym": HTMLAttributes;
    "address": HTMLAttributes;
    "applet": HTMLAppletElement;
    'area': AreaHTMLAttributes;
    "article": HTMLAttributes;
    "aside": HTMLAttributes;
    "audio": HTMLAudioElement;
    "b": HTMLAttributes;
    "base": BaseHTMLAttributes;
    "basefont": HTMLBaseFontElement;
    "bdo": HTMLAttributes;
    "big": HTMLAttributes;
    "blockquote": BlockQuoteHTMLAttributes;
    "body": HTMLBodyElement;
    "br": HTMLBRElement;
    "button": ButtonHTMLAttributes;
    'canvas': CanvasHTMLAttributes;
    "caption": HTMLTableCaptionElement;
    "center": HTMLAttributes;
    "cite": HTMLAttributes;
    "code": HTMLAttributes;
    "col": HTMLTableColElement;
    "colgroup": HTMLTableColElement;
    "data": HTMLDataElement;
    "datalist": HTMLDataListElement;
    "dd": HTMLAttributes;
    "del": HTMLModElement;
    "dfn": HTMLAttributes;
    "dir": HTMLDirectoryElement;
    "div": HTMLDivElement;
    "dl": HTMLDListElement;
    "dt": HTMLAttributes;
    "em": HTMLAttributes;
    "embed": HTMLEmbedElement;
    "fieldset": HTMLFieldSetElement;
    "figcaption": HTMLAttributes;
    "figure": HTMLAttributes;
    "font": HTMLFontElement;
    "footer": HTMLAttributes;
    "form": HTMLFormElement;
    "frame": HTMLFrameElement;
    "frameset": HTMLFrameSetElement;
    "h1": HTMLHeadingElement;
    "h2": HTMLHeadingElement;
    "h3": HTMLHeadingElement;
    "h4": HTMLHeadingElement;
    "h5": HTMLHeadingElement;
    "h6": HTMLHeadingElement;
    "head": HTMLHeadElement;
    "header": HTMLAttributes;
    "hgroup": HTMLAttributes;
    "hr": HTMLHRElement;
    "html": HTMLHtmlElement;
    "i": HTMLAttributes;
    "iframe": HTMLIFrameElement;
    "img": HTMLImageElement;
    "input": HTMLInputElement;
    "ins": HTMLModElement;
    "isindex": HTMLUnknownElement;
    "kbd": HTMLAttributes;
    "keygen": HTMLAttributes;
    "legend": HTMLLegendElement;
    'label': LabelHTMLAttributes;
    "li": HTMLLIElement;
    "link": HTMLLinkElement;
    "listing": HTMLPreElement;
    "map": HTMLMapElement;
    "mark": HTMLAttributes;
    "marquee": HTMLMarqueeElement;
    "menu": HTMLMenuElement;
    "meta": HTMLMetaElement;
    "meter": HTMLMeterElement;
    "nav": HTMLAttributes;
    "nextid": HTMLUnknownElement;
    "nobr": HTMLAttributes;
    "noframes": HTMLAttributes;
    "noscript": HTMLAttributes;
    "object": HTMLObjectElement;
    "ol": HTMLOListElement;
    "optgroup": HTMLOptGroupElement;
    "option": HTMLOptionElement;
    "output": HTMLOutputElement;
    "p": HTMLParagraphElement;
    "param": HTMLParamElement;
    "picture": HTMLPictureElement;
    "plaintext": HTMLAttributes;
    "pre": HTMLPreElement;
    "progress": HTMLProgressElement;
    "q": HTMLQuoteElement;
    "rt": HTMLAttributes;
    "ruby": HTMLAttributes;
    "s": HTMLAttributes;
    "samp": HTMLAttributes;
    "script": HTMLScriptElement;
    "section": HTMLAttributes;
    "select": HTMLSelectElement;
    "slot": HTMLSlotElement;
    "small": HTMLAttributes;
    "source": HTMLSourceElement;
    "span": HTMLSpanElement;
    "strike": HTMLAttributes;
    "strong": HTMLAttributes;
    "style": HTMLStyleElement;
    "sub": HTMLAttributes;
    "sup": HTMLAttributes;
    "table": HTMLTableElement;
    "tbody": HTMLTableSectionElement;
    "td": HTMLTableDataCellElement;
    "template": HTMLTemplateElement;
    "textarea": HTMLTextAreaElement;
    "tfoot": HTMLTableSectionElement;
    "th": HTMLTableHeaderCellElement;
    "thead": HTMLTableSectionElement;
    "time": HTMLTimeElement;
    "title": HTMLTitleElement;
    "tr": HTMLTableRowElement;
    "track": HTMLTrackElement;
    "tt": HTMLAttributes;
    "u": HTMLAttributes;
    "ul": HTMLUListElement;
    "var": HTMLAttributes;
    "video": HTMLVideoElement;
    "wbr": HTMLAttributes;
    "xmp": HTMLPreElement;
}
