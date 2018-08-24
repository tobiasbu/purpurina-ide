import { EditorSelection } from "../../editor/EditorSelection";
import Entity from "../../engine/entity/Entity";
import EditorManager from "../../manager/EditorManager";

export default class EditorSelectionInternal implements EditorSelection {

    private _entities: Entity[];
    private _activeEntity: Entity;
    private _manager:EditorManager;


    public get activeEntity(): Entity {
        return this._activeEntity;
    }

    public get entities(): Entity[] {
        return this._entities;
    }

    constructor(manager: EditorManager) {
        this._manager = manager;
        this._activeEntity = null;
        this._entities = [];
    }

    public setActiveEntity(entity: Entity) {
        if (this._activeEntity !== entity) {
            this._activeEntity = entity;
            this._entities.length = 0;
            this._entities.push(entity);
            this._manager.emit('selectionchange');
        }
    }

}