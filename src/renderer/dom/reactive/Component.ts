import { VirtualNode } from "../virtual-dom/IVirtualNode";
import { h } from "../hyperscript";

export default abstract class Component {

    abstract render(): VirtualNode;
    /**
     * 
     */
    t?();

}

class test extends Component {

    render(): VirtualNode {
        const parent = h('div');
        return parent;
        
    }   


}