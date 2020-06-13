import * as React from 'react';
import Vector2Input, { IVector2Event } from '../../components/Vector2Input';
import Foldout from '../../components/Foldout';
import { Selection, Events } from '../../internal/managers';
import Entity from '../../../engine/entity/Entity';

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
    if (Selection.activeEntity !== null) {
      const pos = Selection.activeEntity.transform.position;
      pos.x = event.value;
      Events.emit('updateActiveEntity');
    }
  };

  render() {
    return (
      <Foldout label="Transform">
        <Vector2Input
          label="Position"
          ref={this._refPosition}
          onChange={this.onChange}
        />
      </Foldout>
    );
  }
}
