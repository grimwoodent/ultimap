import { Callbacks } from 'grim.lib';
import * as L from 'leaflet';
import { Map } from 'leaflet';
import {
    IMapControlStrategy,
    TGetControlInstanceHandler,
    TControlConstructor,
    IMapControlEvents,
    MAP_CONTROL_EVENTS,
} from '../../interface/map-control';
import { IAdaptedControlProps, PropsAdapter } from './props-adapter';

export class LeafletMapControlStrategy implements IMapControlStrategy {
    public getControlInstanceConstructor(): Promise<TGetControlInstanceHandler> {
        return new Promise((resolve, reject) => {
            const ControlConstructor = function ControlConstructorFn(
                    props: IAdaptedControlProps,
                    events: IMapControlEvents = {},
                ) {
                this.props = props || {};
                this.callbacks = new Callbacks(events as any);
            };

            ControlConstructor.prototype.onAdd = function onAddMapControl(map: Map) {
                try {
                    const parentDomContainer = (L.DomUtil as any).create('div');
                    const position = this.props.position;

                    if (position) {
                        parentDomContainer.style.position = 'inherit';
                        parentDomContainer.style.top = position.top || 'auto';
                        parentDomContainer.style.bottom = position.bottom || 'auto';
                        parentDomContainer.style.left = position.left || 'auto';
                        parentDomContainer.style.right = position.right || 'auto';
                    }

                    this.callbacks.trigger(MAP_CONTROL_EVENTS.ON_ADD, parentDomContainer);

                    (L.DomEvent as any).disableScrollPropagation(parentDomContainer);
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
                const propsAdapter = new PropsAdapter(props);
                const control = new (ControlConstructor as any)(propsAdapter.getAdaptedControlProps(), events);

                return new (L.Control.extend(control) as any)(propsAdapter.getAdapted());
            });
        });
    }
}
