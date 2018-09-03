import VirtualNode from "../virtual-dom/VirtualNode";


abstract class Component<A = {}> implements IComponent<A> {
    readonly attrs: A;
    constructor(attrs?: A) {
        this.attrs = attrs;
    }
    abstract render(): HyperNode;
    postRender?(): void;
    preRender?(): void;
}

interface TestProps {

}

export class Test extends Component<TestProps> {

    builder: VirtualNodeBuilder;

    preRender() {
        builder = b('div').append('div', {class:'test'});
    }

    render(): HyperNode {
        return builder;
    }



}

export default Component;
