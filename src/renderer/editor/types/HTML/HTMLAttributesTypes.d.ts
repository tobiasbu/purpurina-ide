declare module Types {
  type IndexerType<K extends string> = {
    [key in K]?: any;
  };

  type AutoCapitalizeType =
    | 'on'
    | 'off'
    | 'none'
    | 'sentences'
    | 'words'
    | 'characters';

  type ButtonType = 'submit' | 'reset' | 'button';

  type CrossOrigin = 'anonymous' | 'use-credentials' | '';

  /**
   * From: https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types
   */
  type CommonLinkTypes =
    | 'alternate'
    | 'author'
    | 'help'
    | 'license'
    | 'next'
    | 'prev'
    | 'search'
    | 'sidebar';

  type AnchorLinkTypes =
    | CommonLinkTypes
    | 'bookmark'
    | 'external'
    | 'nofollow'
    | 'noopener'
    | 'noreferrer'
    | 'tag';

  type LinkTypes =
    | CommonLinkTypes
    | 'canonical'
    | 'dns-prefetch'
    | 'icon'
    | 'manifest'
    | 'modulepreload'
    | 'pingback'
    | 'preconnect'
    | 'preload'
    | 'prerender'
    | 'shortlink'
    | 'stylesheet';

  type FormMethod = 'get' | 'post';

  type EncodingType =
    | 'application/x-www-form-urlencoded'
    | 'multipart/form-data'
    | 'text/plain';

  type IFrameSandbox =
    | 'allow-forms'
    | 'allow-modals'
    | 'allow-orientation-lock'
    | 'allow-pointer-lock'
    | 'allow-popups'
    | 'allow-popups-to-escape-sandbox'
    | 'allow-presentation'
    | 'allow-same-origin'
    | 'allow-scripts'
    | 'allow-top-navigation';

  type InputType =
    | /**
     * A push button with no default behavior.
     */
    'button'
    /**
     * A check box allowing single values to be selected/deselected.
     */
    | 'checkbox'
    /**
     * A control for specifying a color.
     *
     * A color picker's UI has no required features other than accepting simple colors as text
     */
    | 'color'
    /**
     * A control for entering a date (year, month, and day, with no time).
     */
    | 'date'
    /**
     * A control for entering a date and time, with no time zone.
     */
    | 'datetime-local'
    /**
     * A field for editing an e-mail address.
     */
    | 'email'
    /**
     * A control that lets the user select a file.
     *
     * Use the accept attribute to define the types of files that the control can select.
     */
    | 'file'
    /**
     * A control that is not displayed but whose value is submitted to the server.
     */
    | 'hidden'
    /**
     * A graphical submit button.
     *
     * You must use the src attribute to define the source of the image and the alt attribute to define alternative text.
     * You can use the height and width attributes to define the size of the image in pixels.
     */
    | 'image'
    /**
     * A control for entering a month and year, with no time zone.
     */
    | 'month'
    /**
     * A control for entering a number.
     */
    | 'number'
    /**
     * A single-line text field whose value is obscured.
     *
     * Use the maxlength and minlength attributes to specify the maximum length of the value that can be entered.
     */
    | 'password'
    /**
     * A radio button, allowing a single value to be selected out of multiple choices.
     */
    | 'radio'
    /**
     * A control for entering a number whose exact value is not important.
     */
    | 'range'
    /**
     * A button that resets the contents of the form to default values.
     */
    | 'reset'
    /**
     * A single-line text field for entering search strings.
     *
     * Line-breaks are automatically removed from the input value.
     */
    | 'search'
    /**
     * A button that submits the form.
     */
    | 'submit'
    /**
     * A control for entering a telephone number.
     */
    | 'tel'
    /**
     * A single-line text field.
     *
     * Line-breaks are automatically removed from the input value.
     */
    | 'text'
    /**
     * A control for entering a time value with no time zone.
     */
    | 'time'
    /**
     * A field for entering a URL.
     */
    | 'url'
    /**
     * A control for entering a date consisting of a week-year number and a week number with no time zone.
     */
    | 'week'
    /**
     * @deprecated
     */
    | 'datetime';

  type InputAutoComplete =
    | 'off'
    | 'on'
    | 'name'
    | 'email'
    | 'username'
    | 'new-password'
    | 'current-password'
    | 'organization-title'
    | 'organization'
    | 'street-address'
    | 'address-line1'
    | 'address-line2'
    | 'address-line3'
    | 'address-level1'
    | 'address-level2'
    | 'address-level3'
    | 'address-level4'
    | 'country'
    | 'country-name'
    | 'postal-code'
    | 'cc-name'
    | 'cc-given-name'
    | 'cc-additional-name'
    | 'cc-family-name'
    | 'cc-number'
    | 'cc-exp'
    | 'cc-exp-month'
    | 'cc-exp-year'
    | 'cc-csc'
    | 'cc-type'
    | 'transaction-currency'
    | 'transaction-amount'
    | 'language'
    | 'bday'
    | 'bday-day'
    | 'bday-month'
    | 'bday-year'
    | 'sex'
    | 'tel'
    | 'tel-extension'
    | 'tel-country-code'
    | 'tel-national'
    | 'tel-area-code'
    | 'tel-local'
    | 'email'
    | 'impp'
    | 'url'
    | 'photo';

  type ShapeType = 'default' | 'rect' | 'circle' | 'poly';

  type TargetKeywords =
    | /**
     * Load the URL into the same browsing context as the current one.
     */
    '_self'
    /**
     * Load the URL into a new browsing context.
     */
    | '_blank'
    /**
     *  Load the URL into the parent browsing context of the current one.
     */
    | '_parent'
    /**
     * Load the URL into the top-level browsing context (that is, the "highest" browsing context that is an ancestor of the current one, and has no parent).
     */
    | '_top';

  type TextDirectionally = 'ltr' | 'rtl' | 'auto';

  type TrackKind =
    | 'subtitles'
    | 'captions'
    | 'descriptions'
    | 'chapters'
    | 'metadata';

  type ImageMIMETypes =
    | 'image/gif'
    | 'image/jpeg'
    | 'image/png'
    | 'image/svg+xml';

  type TextMIMETypes =
    | 'text/plain'
    | 'text/html'
    | 'text/css'
    | 'text/javascript'
    | 'text/json'
    | 'text/xml';

  type AudioMIMETypes =
    | 'audio/midi'
    | 'audio/mpeg'
    | 'audio/webm'
    | 'audio/ogg'
    | 'audio/wav'
    | 'application/ogg';

  type InputMIMETypes = ImageMIMETypes | TextMIMETypes | AudioMIMETypes;

  type VideoMIMETypes = 'video/webm' | 'video/ogg' | 'application/ogg';

  type FontMIMETypes =
    | 'application/font-cff'
    | 'application/font-off'
    | 'application/font-sfnt'
    | 'application/font-ttf'
    | 'application/font-woff'
    | 'application/vnd.ms-fontobject'
    | 'application/vnd.ms-opentype';

  type ArchiveMIMETypes =
    | 'application/x-rar-compressed'
    | 'application/zip'
    | 'application/x-gzip';

  type ApplicationMIMETypes =
    | 'application/octet-stream'
    | 'application/pkcs12'
    | 'application/vnd.mspowerpoint'
    | 'application/xhtml+xml'
    | 'application/xml'
    | 'application/pdf'
    | 'application/json'
    | 'application/zip';

  type JavascriptMIMETypes =
    | 'application/ecmascript'
    | 'application/javascript'
    | 'application/x-ecmascript'
    | 'application/x-javascript'
    | 'text/ecmascript'
    | 'text/javascript1.0'
    | 'text/javascript1.1'
    | 'text/javascript1.2'
    | 'text/javascript1.3'
    | 'text/javascript1.4'
    | 'text/javascript1.5'
    | 'text/jscript'
    | 'text/livescript'
    | 'text/x-ecmascript'
    | 'text/x-javascript ';

  type MIMETypes =
    | ImageMIMETypes
    | TextMIMETypes
    | AudioMIMETypes
    | VideoMIMETypes
    | ApplicationMIMETypes
    | JavascriptMIMETypes;
}
