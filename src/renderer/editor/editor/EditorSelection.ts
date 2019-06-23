import Entity from '../../engine/entity/Entity';

export interface EditorSelection {

  /**
   * Get the current active entity in the scene
   */
  readonly activeEntity: Entity;

  /**
   * Get the group of selected entities
   */
  readonly entities: Entity[];

}
