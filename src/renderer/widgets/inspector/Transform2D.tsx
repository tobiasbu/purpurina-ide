import * as React from "react";
import Vector2Input, {IVector2Event} from "../../components/Vector2Input";
import Foldout from "../../components/Foldout";
import Manager from "../../manager";

export default class Transform2D extends React.Component {

    private _refPosition: React.RefObject<Vector2Input>;

    constructor(props) {
        super(props);

        this._refPosition = React.createRef<Vector2Input>();
    }

    inspect(entity: Entity) {
        this._refPosition.current.setValues(entity.transform.position);
    }

    private onChange = (event: IVector2Event) => {

        if (Manager.selection.activeEntity !== null) {
            const pos = Manager.selection.activeEntity.transform.position;
            pos.x = event.value;
            Manager.emit('updateActiveEntity');

            
        }

    }

    render() {
        return (
            <Foldout label='Transform'>
                <Vector2Input label='Position' ref={this._refPosition} onChange={this.onChange} />
            </Foldout>
        )
    }

}