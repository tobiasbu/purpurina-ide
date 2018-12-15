

enum SpecialAttrs {
    'style'
};



function applyInlineStyle(element: HTMLElement, style: HTML.InlineStyle) {
    const elemStyle = element.style;
    let name: keyof HTML.InlineStyle;
    for (name in style) {
        elemStyle[name] = style[name];
    }
}

export function applyAttributes<K extends HTML.Tags>(node: HTMLElement, attr: HTML.Attributes.TagMap[K]) {

    if (attr === undefined || attr === null) {
        return;
    }

    for (const iterator in attr) {
        if (name in SpecialAttrs) {
            continue;
        }
        const value = attr[iterator];
        if (typeof (value) !== 'string') {
            node.setAttribute(iterator, value.toString());  
        } else {
            node.setAttribute(iterator, value);
        }
    }

    if (attr.style) {
        applyInlineStyle(node, attr.style as HTML.InlineStyle);
    }
        

}

function updateStyle(element: HTMLElement, oldStyle:  HTML.InlineStyle, newStyle:  HTML.InlineStyle): void {
    let elemStyle = element.style;
    let name: keyof HTML.InlineStyle;
    for (name in oldStyle) {
      if (!(name in newStyle)) {
        elemStyle[name] = '';
      }
    }
    for (name in newStyle) {
      if (oldStyle[name] !== newStyle[name]) {
        elemStyle[name] = newStyle[name];
      }
    }
}

export function updateAttrs<T extends HTML.Tags>(oldAttrs: HTML.Attributes.TagMap[T], newAttrs: HTML.Attributes.TagMap[T], element: HTMLElement): void {
    // Do nothing if the attrs are the same object.
    if (oldAttrs === newAttrs) {
      return;
    }

    // Setup the strongly typed loop variable.
    let name: keyof HTML.Attributes.TagMap[T];

    // Remove attributes and listeners which no longer exist.
    for (name in oldAttrs) {
      if (name in SpecialAttrs || name in newAttrs) {
        continue;
      }
      if ((name as string).substr(0, 2) === 'on') {
        (element as any)[name] = null;
      } else {
        element.removeAttribute(name as string);
      }
    }

    // Add and update new and existing attributes and listeners.
    for (name in newAttrs) {
      if (name in SpecialAttrs || oldAttrs[name] === newAttrs[name]) {
        continue;
      }
      if ((name as string).substr(0, 2) === 'on') {
        (element as any)[name] = (newAttrs as any)[name];
      } else {
        element.setAttribute(name as string, (newAttrs as any)[name]);
      }
    }

    // Update the element `class` attribute.
    // if (oldAttrs.class !== newAttrs.class) {
    //   if (newAttrs.class !== undefined) {
    //     element.setAttribute('class', newAttrs.class);
    //   } else {
    //     element.removeAttribute('class');
    //   }
    // }

    // // Add the element `for` attribute.
    // if (oldAttrs.for !== newAttrs.htmlFor) {
    //   if (newAttrs.for !== undefined) {
    //     element.setAttribute('for', newAttrs.htmlFor);
    //   } else {
    //     element.removeAttribute('for');
    //   }
    // }

    // Update the dataset values.
    // if (oldAttrs.dataset !== newAttrs.dataset) {
    //   updateDataset(element, oldAttrs.dataset || {}, newAttrs.dataset || {});
    // }

    // Update the inline styles.
    if (oldAttrs.style !== newAttrs.style) {
      updateStyle(element, oldAttrs.style || {}, newAttrs.style || {});
    }
}
