import { Callbacks } from 'grim.lib';
import * as L from 'leaflet';
import { Map } from 'leaflet';
import {
    IMapControlStrategy,
    TGetControlInstanceHandler,
    TControlConstructor,
    IMapControlEvents,
    MAP_CONTROL_EVENTS,
} from '../interface/map-control';

export class LeafletMapControlStrategy implements IMapControlStrategy {
    public getControlInstanceConstructor(): Promise<TGetControlInstanceHandler> {
        return new Promise((resolve, reject) => {
            const ControlConstructor = function ControlConstructor(props: any = {}, events: IMapControlEvents = {}) {
                this.props = {}; // props; // @TODO adapter
                this.callbacks = new Callbacks(events as any);
            }

            ControlConstructor.prototype.onAdd = function onAddMapControl(map: Map) {
                try {
                    const parentDomContainer = L.DomUtil.create('div');

                    this.callbacks.trigger(MAP_CONTROL_EVENTS.ON_ADD, parentDomContainer);

                    L.DomEvent.disableScrollPropagation(parentDomContainer);
                    L.DomEvent.disableClickPropagation(parentDomContainer);

                    return parentDomContainer;
                } catch (err) {
                    console.error(err);
                }
            };

            ControlConstructor.prototype.onRemove = function onRemoveMapControl(map: Map) {
                this.callbacks.trigger(MAP_CONTROL_EVENTS.ON_REMOVE);
            };

            resolve((props?: any, events?: IMapControlEvents) => {
                const control = new (ControlConstructor as any)(props, events);

                return new (L.Control.extend(control) as any)();
            });
        });
    }
}
