
abstract class Component<A extends {}> implements IComponent<A> {
    private _attrs: A;

    get attrs(): A {
        return this._attrs;
    }

    abstract render(): HyperNode;
    /**
     * 
     */
    t?();

}

export default Component;

// class test extends Component {

//     render(): VirtualNode {
//         const parent = h('div');
//         return parent;

//     }   


// }