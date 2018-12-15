import { InlineStyle } from "./InlineStyle";
// import { EventAttrs } from "./HTMLEvents";



export as namespace HTMLAttributes;

    /**
     * Common attributes to all HTML elements.
     * They can be used on all elements, though they may have no effect on some elements.
     * 
     * Source: 
     * 
     * - https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
     * - https://html.spec.whatwg.org/multipage/indices.html#attributes-3
     */

    type AttributesNames = (
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
    export interface Attributes extends HTML.EventAttrs {
        /**
         * Defines a keyboard shortcut to activate or add focus to the element.
         */
        accesskey?: string;
        /**
         * Controls whether and how text input is automatically capitalized as it is entered/edited by the user.
         */
        autocapitalize?: Types.AutoCapitalizeType;
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
        dir?: Types.TextDirectionally;
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
         * Properties that are not descendants of an element with the itemscope attribute
         * can be associated with the item using an itemref;
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
        style?: InlineStyle;
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

    interface AnchorAttributes extends Attributes {
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
        target?: string | Types.TargetKeywords;
        /**
         * Specifies the media type in the form of a MIME type for the linked URL. 
         */
        type?: Types.AnchorLinkTypes;
    }

    interface AreaAttributes extends AnchorAttributes {
        /**
         * A text string alternative to display on browsers that do not display images. 
         */
        alt?: string;
        /**
         * A set of values specifying the coordinates of the hot-spot region.
         */
        coords?: string;
        shape?: Types.ShapeType;
        /**
         * Specifies where to display the linked URL.
         */
        target?: string | Types.TargetKeywords;
    }

    interface BaseAttributes extends Attributes {
        /**
         * The URL of a linked resource.
         */
        href?: string;
        /**
         * A name or keyword indicating the default location to display the result when hyperlinks
         * or forms cause navigation, for elements that do not have an explicit target reference.
         */
        target?: string | Types.TargetKeywords;
    }

    interface BlockquoteAttributes extends Attributes {
        /**
         * A URL that designates a source document or message for the information quoted.
         */
        cite?: string;
    }

    interface ButtonAttributes extends Attributes {
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
         * If the button is a submit button, this attribute specifies the type of content
         * that is used to submit the form to the server. 
         * 
         * If this attribute is specified, it overrides the 'enctype' attribute of the button's form owner.
         */
        formenctype?: Types.EncodingType;
        /**
         * If the button is a submit button, this attribute specifies the HTTP method that
         * the browser uses to submit the form. 
         * 
         * If specified, this attribute overrides the 'method' attribute of the button's form owner.
         */
        formmethod?: Types.FormMethod;
        /**
         * If the button is a submit button, this Boolean attribute specifies that the form is
         * not to be validated when it is submitted.
         * 
         * If this attribute is specified, it overrides the 'novalidate' attribute of the button's form owner.
         */
        formnovalidate?: boolean;
        /**
         * If the button is a submit button, this attribute is a name or keyword indicating where
         * to display the response that is received after submitting the form.
         */
        formtarget?: string | Types.TargetKeywords;
        /**
         * Name of the element. For example used by the server to identify the fields in form submits.
         */
        name?: string;
        /**
         * Defines the type of the element.
         */
        type?: Types.ButtonType;
        /**
         * Defines a default value which will be displayed in the element on page load.
         */
        value?: string | string[] | number;
    }

    interface CanvasAttributes extends Attributes {
        /**
         * Specifies the height of <canvas>
         */
        height?: number | string;
        /**
         * Specifies the width of <canvas>
         */
        width?: number | string;
    }

    interface DetailsAttributes extends Attributes {
        /**
         * Whether the details are visible 
         */
        open?: boolean;
    }

    interface DelAttributes extends Attributes {
        /**
         * A URL that designates a source document or message for the information quoted.
         */
        cite?: string;
        /**
         * Date and (optionally) time of the change
         */
        dateTime?: string;
    }

    interface DialogAttributes extends Attributes {
        /**
         * Whether the dialog box is showing 
         */
        open?: boolean;
    }

    interface EmbedAttributes extends Attributes {
        /**
         * Specifies the height of <embed> element.
         * 
         * This must be an absolute value; percentages are not allowed.
         */
        height?: number | string;
        /**
         * Specifies the width of <embed> element.
         * 
         * This must be an absolute value; percentages are not allowed.
         */
        width?: number | string;
        /**
         * The URL of the embeddable content.
         */
        src?: string;
        /**
         * The MIME type to use to select the plug-in to instantiate.
         */
        type?: Types.MIMETypes | string;

    }

    interface FieldsetAttributes extends Attributes {
        /**
         * If this Boolean attribute is set, all form controls that are descendants of the <fieldset>, are disabled.
         */
        disabled?: boolean;
        /**
         * The id attribute of a <form> element you want the <fieldset> to be part of.
         */
        form?: string;
        /**
         * The name associated with the group.
         */
        name?: string;
    }

    interface FormAttributes extends Attributes {
        ['accept-charset']: this['acceptCharset'];
        /**
         * Character encodings to use for form submission
         */
        acceptCharset?: string;
        /**
         * URL to use for form submission
         */
        action?: string;
        /**
         * Default setting for autofill feature for controls in the form 
         */
        autocomplete?: 'on' | 'off';
        /**
         * Entry list encoding type to use for form submission
         */
        enctype?: Types.EncodingType | 'dialog';
        /**
         * Variant to use for form submission
         */
        method?: Types.FormMethod;
        /**
         * Name of form to use in the 'document.forms' API 
         */
        name?: string;
        /**
         * Bypass form control validation for form submission
         */
        novalidate?: boolean;
        /**
         * Browsing context for form submission
         */
        target?: string | Types.TargetKeywords;
    }

    interface InputAttributes extends Attributes {
        /**
         *  This attribute indicates the types of files that the server accepts.
         * 
         *  The value must be comma-separated unique 'content type specifiers': 
         * 
         * @extends AudioMIMETypes
         * @extends VideoMIMETypes
         * @extends ImageMIMETypes
         */
        accept?: string;
        /**
         * Alternative text in case an image can't be displayed.
         */
        alt?: string;
        /**
         * Indicates if the input can be automatically completed by the browser, 
         */
        autocomplete?: Types.InputAutoComplete;
        /**
         * The element should be automatically focused after the page loaded.
         */
        autofocus?: boolean;
        /**
         * Indicates that capture of media directly from the device's sensors
         */
        capture?: boolean | string;
        /**
         * If the value of the type attribute is 'radio' or 'checkbox', this attribute pre-checks
         * the control before the user interacts with it.
         */
        checked?: boolean;
        crossorigin?: Types.CrossOrigin;
        /**
         * Prevents the user from interacting with the input
         */
        disabled?: boolean;
        /**
         * The form element that the <input> element is associated with (its <form> owner).
         */
        form?: string;
        /**
         * The URL that processes the data submitted by the <input> element,
         * if it is a submit button or image.
         */
        formaction?: string;
        /**
         * Specifies the content encoding that is used to submit the form data to the server
         */
        formenctype?: Types.EncodingType;
        /**
         * Specifies the content encoding that is used to submit the form data to the server
         */
        formmethod?: Types.FormMethod;
        /**
         * Specifies that the form shouldn't be validated before submission
         */
        formnovalidate?: boolean;
        /**
         * A name or keyword indicating where to display the response that is
         * received by submitting the form
         */
        formtarget?: string | Types.TargetKeywords;
        /**
         * If the value of the 'type' attribute is 'image', defines the height of 
         * the image displayed for the button in pixels.
         */
        height?: number | string;
        /**
         * Points to a <datalist> of predefined options to suggest to the user. 
         */
        list?: string;
        /**
         * The maximum (numeric or date-time) value for the input. 
         */
        max?: number | string;
        /**
         * Specifies the maximum number of characters
         */
        maxlength?: number;
        /**
         * The minimum (numeric or date-time) value for this input.
         */
        min?: number | string;
        /**
         *  Specifies the minimum number of characters
         */
        minlength?: number;
        /**
         * Indicates whether the user can enter more than one value
         */
        multiple?: boolean;
        /**
         * The name of the control, which is submitted with the control's value as
         * part of the form data.
         */
        name?: string;
        /**
         * A regular expression that the control's value is checked against.
         * @see RegExp
         */
        pattern?: string;
        /**
         * A hint to the user of what can be entered in the control, typically in 
         * the form of an example of the type of information that should be entered.
         */
        placeholder?: string;
        /**
         * Prevents the user from modifying the value of the input.
         */
        readonly?: boolean;
        /**
         * Specifies that the user must fill in a value before submitting a form.
         */
        required?: boolean;
        /**
         * The initial size of the control.
         */
        size?: number;
        /**
         * If the value of the type attribute is image, this attribute specifies the
         * URL of the image file to display on the graphical submit button.
         */
        src?: string;
        /**
         * Works with the min and max attributes to limit the increments at which a
         * numeric or date-time value can be set.
         * 
         * It can be the string 'any' or a positive 'floating point' number. 
         * 
         * If this attribute is not set to any, the control accepts only values at multiples of
         * the step value greater than the minimum.
         */
        step?: number | string;
        /**
         * The type of control to render.
         */
        type?: Types.InputType;
        /**
         * The initial value of the control.
         */
        value?: string | string[] | number;
        /**
         * If the value of the 'type' attribute is 'image', defines the width of 
         * the image displayed for the button in pixels.
         */
        width?: number | string;
    }

    interface IFrameAttributes extends Attributes {
        /**
         * Whether to allow the <iframe> contents to use 'requestFullscreen()'
         */
        allowfullscreen?: boolean;
        /**
         * Specifies the height of <iframe> element.
         * 
         * This must be an absolute value; percentages are not allowed.
         */
        height?: number | string;
        /**
         * Name of nested browsing context
         */
        name?: string;
        /**
         * Security rules for nested content 
         * @see IFrameSandbox for valid options.
         */
        sandbox?: string;
        /**
         * Address of the resource 
         */
        src?: string;
        /**
         * A document to render in the <iframe>
         */
        srcdoc?: string;
        /**
         * Specifies the width of <iframe> element.
         * 
         * This must be an absolute value; percentages are not allowed.
         */
        width?: number | string;
        /**
         * Referrer policy for fetches initiated by the element 
         */
        referrerpolicy?: ReferrerPolicy;
        /**
         * @deprecated
         */
        scrolling?: 'yes' | 'no' | 'auto';
        /**
         * @deprecated
         */
        marginwidth?: number;
        /**
         * @deprecated
         */
        marginheight?: number;
        /**
         * @deprecated
         */
        frameborder?: number | string;
    }

    interface ImageAttributes extends Attributes {
        alt?: string;
        crossorigin?: Types.CrossOrigin;
        height?: number | string;
        sizes?: string;
        src?: string;
        srcset?: string;
        usemap?: string;
        width?: number | string;
    }

    interface HtmlAttributes extends Attributes {
        manifest?: string;
    }

    interface KeygenAttributes extends Attributes {
        autofocus?: boolean;
        challenge?: string;
        disabled?: boolean;
        form?: string;
        keytype?: string;
        keyparams?: string;
        name?: string;
    }

    interface LabelAttributes extends Attributes {
        /**
         * Indicates the <form> that is the owner of the element.
         */
        form?: string;
        /**
         * Describes elements which belongs to this one.
         */
        for?: string;
    }

    interface LiAttributes extends Attributes {
        value?: string | string[] | number;
    }

    interface LinkAttributes extends Attributes {
        as?: string;
        crossorigin?: Types.CrossOrigin;
        href?: string;
        hreflang?: string;
        integrity?: string;
        media?: string;
        /**
         * @see LinkTypes
         */
        rel?: string;
        sizes?: string;
        type?: Types.MIMETypes;
        referrerpolicy?: ReferrerPolicy;
    }

    interface MapAttributes extends Attributes {
        name?: string;
    }

    interface MenuAttributes extends Attributes {
        type?: string;
    }

    interface MediaAttributes extends Attributes {
        autoplay?: boolean;
        controls?: boolean;
        controlslist?: string;
        crossorigin?: Types.CrossOrigin;
        loop?: boolean;
        mediagroup?: string;
        muted?: boolean;
        /**
         * Encourage the user agent to display video content within the element's playback area 
         */
        playsinline?: boolean;
        /**
         * Hints how much buffering the media resource will likely need 
         */
        preload?: "none" | "metadata" | "auto";
        /**
         * Address of the resource 
         */
        src?: string;
    }

    interface AudioAttributes extends MediaAttributes {
        type?: Types.AudioMIMETypes;
    }

    interface MeterAttributes extends Attributes {
        form?: string;
        high?: number;
        low?: number;
        max?: number | string;
        min?: number | string;
        optimum?: number;
        value?: string | string[] | number;
    }

    interface MetaAttributes extends Attributes {
        charset?: string | 'UTF-8';
        content?: string;
        httpequiv?: string;
        name?: string;
    }

    /** <ins> */
    interface ModAttributes extends Attributes {
        cite?: string;
        datetime?: string;
    }

    interface ObjectAttributes extends Attributes {
        classid?: string;
        data?: string;
        form?: string;
        height?: number | string;
        name?: string;
        type?: string;
        usemap?: string;
        width?: number | string;
        wmode?: string;
    }

    interface OlAttributes extends Attributes {
        reversed?: boolean;
        start?: number;
        type?: '1' | 'a' | 'A' | 'i' | 'I';
    }

    interface OptgroupAttributes extends Attributes {
        disabled?: boolean;
        label?: string;
    }

    interface OptionAttributes extends Attributes {
        disabled?: boolean;
        label?: string;
        selected?: boolean;
        value?: string | string[] | number;
    }

    interface OutputAttributes extends Attributes {
        form?: string;
        htmlFor?: string;
        name?: string;
    }

    interface ParamAttributes extends Attributes {
        name?: string;
        value?: string | string[] | number;
    }

    interface ProgressAttributes extends Attributes {
        max?: number | string;
        value?: string | string[] | number;
    }

    interface ScriptAttributes extends Attributes {
        async?: boolean;
        charset?: string;
        crossorigin?: Types.CrossOrigin;
        defer?: boolean;
        integrity?: string;
        nomodule?: boolean;
        nonce?: string;
        src?: string;
        type?: string;
    }

    interface SelectAttributes extends Attributes {
        autoComplete?: string;
        autoFocus?: boolean;
        disabled?: boolean;
        form?: string;
        multiple?: boolean;
        name?: string;
        required?: boolean;
        size?: number;
        value?: string | string[] | number;
    }

    interface SourceAttributes extends Attributes {
        media?: string;
        sizes?: string;
        src?: string;
        srcSet?: string;
        type?: string;
    }

    interface StyleAttributes extends Attributes {
        media?: string;
        nonce?: string;
        scoped?: boolean;
        type?: string;
    }

    interface TableAttributes extends Attributes {
        cellPadding?: number | string;
        cellSpacing?: number | string;
        summary?: string;
    }

    interface TextareaAttributes extends Attributes {
        autocomplete?: string;
        autofocus?: boolean;
        cols?: number;
        dirName?: string;
        disabled?: boolean;
        form?: string;
        maxlength?: number;
        minlength?: number;
        name?: string;
        placeholder?: string;
        readonly?: boolean;
        required?: boolean;
        rows?: number;
        value?: string | string[] | number;
        wrap?: string;
    }

    /** <td> */
    interface TableDataCellAttributes extends Attributes {
        colspan?: number;
        headers?: string;
        rowspan?: number;
        scope?: string;
    }

    /** <th> */
    interface TableHeaderCellAttributes extends Attributes {
        colspan?: number;
        headers?: string;
        rowspan?: number;
        scope?: string;
    }

    interface TableColAttributes extends Attributes {
        span?: number;
    }

    interface TableColGroupAttributes extends Attributes {
        span?: number;
        width?: number | string;
    }


    interface TimeAttributes extends Attributes {
        /**
         * Machine-readable value 
         */
        datetime?: string;
    }

    interface TrackAttributes extends Attributes {
        /**
         * Enable the track if no other text track is more suitable 
         */
        default?: boolean;
        /**
         * The type of text track 
         */
        kind?: Types.TrackKind;
        /**
         * User-visible label 
         */
        label?: string;
        /**
         * Address of the resource 
         */
        src?: string;
        /**
         * Language of the text track 
         */
        srclang?: string;
    }

    interface VideoAttributes extends MediaAttributes {
        /**
         * Vertical dimension 
         */
        height?: number | string;
        /**
         * Horizontal dimension 
         */
        width?: number | string;
        /**
         * Poster frame to show prior to video playback 
         */
        poster?: string;
    }



    export interface AttributesTagMap {
        'a': AnchorAttributes;
        'abbr': Attributes;
        "acronym": Attributes;
        "address": Attributes;
        "applet": Attributes;
        'area': AreaAttributes;
        "article": Attributes;
        "aside": Attributes;
        "audio": AudioAttributes;
        "b": Attributes;
        "base": BaseAttributes;
        "basefont": Attributes;
        "bdo": Attributes;
        "big": Attributes;
        "blockquote": BlockquoteAttributes;
        "body": Attributes;
        "br": Attributes;
        "button": ButtonAttributes;
        'canvas': CanvasAttributes;
        "caption": Attributes;
        "center": Attributes;
        "cite": Attributes;
        "code": Attributes;
        "col": TableColAttributes;
        "colgroup": TableColGroupAttributes;
        "data": Attributes;
        "datalist": Attributes;
        "dd": Attributes;
        "del": DelAttributes;
        'dialog': DialogAttributes;
        "dfn": Attributes;
        "dir": Attributes;
        "div": Attributes;
        "dl": Attributes;
        "dt": Attributes;
        "em": Attributes;
        "embed": EmbedAttributes;
        "fieldset": FieldsetAttributes;
        "figcaption": Attributes;
        "figure": Attributes;
        "font": Attributes;
        "footer": Attributes;
        "form": FormAttributes;
        "frame": Attributes;
        "frameset": Attributes;
        "h1": Attributes;
        "h2": Attributes;
        "h3": Attributes;
        "h4": Attributes;
        "h5": Attributes;
        "h6": Attributes;
        "head": Attributes;
        "header": Attributes;
        "hgroup": Attributes;
        "hr": Attributes;
        "html": HtmlAttributes;
        "i": Attributes;
        "iframe": IFrameAttributes;
        "img": ImageAttributes;
        "input": InputAttributes;
        "ins": ModAttributes;
        "isindex": Attributes;
        "kbd": Attributes;
        "keygen": KeygenAttributes;
        "legend": Attributes;
        'label': LabelAttributes;
        "li": LiAttributes;
        "link": LinkAttributes;
        "listing": Attributes;
        "map": MapAttributes;
        "mark": Attributes;
        "marquee": Attributes;
        "menu": MenuAttributes;
        "meta": MetaAttributes;
        "meter": MeterAttributes;
        "nav": Attributes;
        "nextid": Attributes;
        "nobr": Attributes;
        "noframes": Attributes;
        "noscript": Attributes;
        "object": ObjectAttributes;
        "ol": OlAttributes;
        "optgroup": OptgroupAttributes;
        "option": OptionAttributes;
        "output": OutputAttributes;
        "p": Attributes;
        "param": ParamAttributes;
        "picture": Attributes;
        "plaintext": Attributes;
        "pre": Attributes;
        "progress": ProgressAttributes;
        "q": BlockquoteAttributes;
        "rt": Attributes;
        "ruby": Attributes;
        "s": Attributes;
        "samp": Attributes;
        "script": ScriptAttributes;
        "section": Attributes;
        "select": SelectAttributes;
        "slot": Attributes;
        "small": Attributes;
        "source": SourceAttributes;
        "span": Attributes;
        "strike": Attributes;
        "strong": Attributes;
        "style": StyleAttributes;
        "sub": Attributes;
        "sup": Attributes;
        "table": TableAttributes;
        "tbody": Attributes;
        "td": TableDataCellAttributes;
        "template": Attributes;
        "textarea": TextareaAttributes;
        "tfoot": Attributes;
        "th": TableHeaderCellAttributes;
        "thead": Attributes;
        "time": TimeAttributes;
        "title": Attributes;
        "tr": Attributes;
        "track": TrackAttributes;
        "tt": Attributes;
        "u": Attributes;
        "ul": Attributes;
        "var": Attributes;
        "video": VideoAttributes;
        "wbr": Attributes;
        "xmp": Attributes;


    }


