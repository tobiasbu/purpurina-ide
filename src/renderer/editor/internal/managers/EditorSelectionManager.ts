import { EditorSelection } from "../../editor/EditorSelection";
import Entity from "../../../engine/entity/Entity";
import { IEventEmitter } from "../../../engine/events/emitter/IEventEmitter";


export default class EditorSelectionManager implements EditorSelection {

    private _entities: Entity[];
    private _activeEntity: Entity;
    private _emitter :IEventEmitter;


    public get activeEntity(): Entity {
        return this._activeEntity;
    }

    public get entities(): Entity[] {
        return this._entities;
    }

    constructor(emitter: IEventEmitter) {
        this._emitter = emitter;
        this._activeEntity = null;
        this._entities = [];
    }

    public setActiveEntity(entity: Entity) {
        if (this._activeEntity !== entity) {
            this._activeEntity = entity;
            this._entities.length = 0;
            this._entities.push(entity);
            this._emitter.emit('selectionchange');
        }
    }

}