

export function getMouseWheelEventName(): string {
    let prefix = "";

    if (window.addEventListener) {
        //_addEventListener = "addEventListener";
    } else {
        //_addEventListener = "attachEvent";
        prefix = "on";
    }

    const support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
        document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
            "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox

    return prefix + support;
}