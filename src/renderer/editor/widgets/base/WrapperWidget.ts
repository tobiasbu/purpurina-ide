import { Widget } from "@phosphor/widgets";

export default class WrapperWidget extends Widget {
    constructor(name: string, node: HTMLElement) {
        super({ node });
        //this.setFlag(Widget.Flag.DisallowLayout);
        this.title.label = name;
        this.title.closable = true;
        this.title.caption = 'Long description for:';

    }
}

