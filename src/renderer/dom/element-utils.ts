
const specialAttrs = {
    'style': true
};

function applyInlineStyle(element: HTMLElement, style: HTML.InlineStyle) {
    let elemStyle = element.style;
    let name: keyof HTML.InlineStyle;
    for (name in style) {
        elemStyle[name] = style[name];
    }
}

export function applyAttributes<K extends HTML.Tags>(node: HTMLElement, attr: HTML.AttributesTagMap[K]) {

    if (attr === undefined || attr === null) {
        return;
    }

    for (const iterator in attr) {
        if (name in specialAttrs) {
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

